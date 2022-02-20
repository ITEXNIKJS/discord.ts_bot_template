import { CommandInteractionOptionResolver, Collection } from "discord.js";
import { ExtendedClient } from "../structures/Client";
import { Event } from "../structures/Events";
import { ExtendedInteraction } from "../typings/Interaction";

const cooldowns = new Map();

export default new Event(
  "interactionCreate",
  async (client: ExtendedClient, interaction: ExtendedInteraction) => {
    console.log(1)
    if (interaction.isCommand()) {
      await interaction.deferReply();
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }

      const curr_time = Date.now();
      const timestamp = cooldowns.get(command.name);
      const cooldown_amount = command.cooldown * 1000;

      if (timestamp.has(interaction.member.id)) {
        const exp_time = timestamp.get(interaction.member.id) + cooldown_amount;

        if (curr_time < exp_time) {
          const timeLeft = Math.ceil((exp_time - curr_time) / 1000);

          return interaction.followUp(
            `Вы использовали команду слишком часто. Подождите ещё ${timeLeft} секунд.`
          );
        }
      }

      timestamp.set(interaction.member.id, curr_time);

      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
      });

      setTimeout(() => {
        timestamp.delete(interaction.member.id);
      }, cooldown_amount);
    }

    if (interaction.isSelectMenu()) {
      if (interaction.customId !== "reaction-roles") return;

      await interaction.deferUpdate();

      const Roles = interaction.guild.roles.cache.map((role) => {
        if (role.name.includes("role") && role.id) {
          return role.id;
        }
      });

      if (!interaction.values[0]) {
        Roles.forEach(async (roleId) => {
          const hasRole = interaction.member.roles.cache.get(roleId);

          if (hasRole) {
            await interaction.member.roles.remove(roleId);
          }
        });
      } else {
        Roles.forEach(async (id) => {
          const hasRole = interaction.member.roles.cache.get(id);

          if (hasRole && !interaction.values.includes(id)) {
            await interaction.member.roles.remove(id);
          }
        });

        interaction.values.forEach(async (roleId) => {
          const hasRole = interaction.member.roles.cache.get(roleId);

          if (!hasRole) {
            await interaction.member.roles.add(roleId);
          }
        });
      }
    }
  }
);
