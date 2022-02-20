import { ClientEvents } from "discord.js";
import { ExtendedClient } from "./Client";

export class Event<Key extends keyof ClientEvents> {
  constructor(
    public eventName: Key,
    public run: (client: ExtendedClient, ...args: ClientEvents[Key]) => any
  ) {}
}
