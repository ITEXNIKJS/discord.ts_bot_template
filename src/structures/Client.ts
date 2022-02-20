import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { RegisterCommandsOptions } from "../typings/Client";
import { CommandType } from "../typings/Command";
import { Event } from "./Events";
import { glob } from "glob";
import { promisify } from "util";
import { client } from "..";

import shemas, { sequelize } from "./Database";

const globPromised = promisify(glob);

export class ExtendedClient extends Client {
  public commands: Collection<string, CommandType> = new Collection();
  public db = { shemas, sequelize };
  public prefix: string = "!";

  constructor() {
    super({ intents: 32767 });
  }

  async init() {
    this.regModule();
    try {
      this.login(process.env.TOKEN);
    } catch (err) {
      console.log(err);
    }
  }

  async importFile(path: string) {
    return (await import(path))?.default;
  }

  async regSlashCommands({ commands, guildID }: RegisterCommandsOptions) {
    try {
      if (guildID) {
        //Регистрируем для опр гильдии
        const guild = await this.guilds.cache.get(guildID);

        guild?.commands.set(commands).then((cmd) => {
          const getRoles = (commandName: string) => {
            const permissions = this.commands.find(
              (x) => x.name === commandName
            ).userPermissions;

            if (!permissions) return null;
            return guild.roles.cache.filter(
              (x) => x.permissions.has(permissions) && !x.managed
            );
          };

          const fullPermissions = cmd.reduce((accumulater: any, x: any) => {
            const roles = getRoles(x.name);
            if (!roles) return accumulater;

            const permissions = roles.reduce((a: any, v: any) => {
              return [
                ...a,
                {
                  id: v.id,
                  type: "ROLE",
                  permission: true,
                },
              ];
            }, []);

            return [
              ...accumulater,
              {
                id: x.id,
                permissions,
              },
            ];
          }, []);

          guild.commands.permissions.set({ fullPermissions });
        });
        console.log(`[START LOG] Регистрирую команды в пул гильдии!`);
      } else {
        //Регистрируем для всего пула
        this.application.commands.set([]);
        this.application.commands.set(commands);
        console.log(`[START LOG] Регистрирую команды в общий пул!`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async MultiGuildSetup(command: CommandType) {
    if (command.name == "ping") {
      command.cooldown = 10;
    }

    return command;
  }

  async regModule() {
    try {
      const slashCommands: ApplicationCommandDataResolvable[] = [];
      const commandFiles = await globPromised(
        `${__dirname}/../commands/*/*{.ts,.js}`
      );

      commandFiles.forEach(async (path) => {
        let command: CommandType = await this.importFile(path);
        if (!command.name) return;

        command = await this.MultiGuildSetup(command);
        if (command.userPermissions) command.defaultPermission = false;

        this.commands.set(command.name, command);
        slashCommands.push(command);
      });

      this.once("ready", () => {
        this.regSlashCommands({
          commands: slashCommands,
          guildID: process.env.guildId || null,
        });
      });

      const eventFiles = await globPromised(
        `${__dirname}/../events/*{.ts,.js}`
      );

      eventFiles.forEach(async (path) => {
        const event: Event<keyof ClientEvents> = await this.importFile(path);

        this.on(event.eventName, event.run.bind(null, client));
      });
    } catch (err) {
      console.log(err);
    }
  }
}
