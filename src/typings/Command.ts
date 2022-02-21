import {
  ChatInputApplicationCommandData,
  CommandInteractionOptionResolver,
  Message,
  PermissionResolvable,
} from "discord.js";
import { ExtendedClient } from "../structures/Client";
import { ExtendedInteraction } from "./Interaction";

interface RunOptions {
  client: ExtendedClient;
  interaction?: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

interface MessageRunOptions {
  client: ExtendedClient;
  message: Message;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;
type MessageRunFunction = (options: MessageRunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  cooldown?: number;
  run?: RunFunction;
  messageExecute?: MessageRunFunction;
} & ChatInputApplicationCommandData;
