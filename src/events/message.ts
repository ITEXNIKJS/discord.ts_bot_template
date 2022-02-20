import { Message } from "discord.js";
import { ExtendedClient } from "../structures/Client";
import { Event } from "../structures/Events";

export default new Event("messageCreate", async (client, message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(client.prefix))
    renderMessage(message, client);
  else renderCommands(message, client);
});

async function renderMessage(message: Message, client: ExtendedClient) {
  console.log(message);
}

async function renderCommands(message: Message, client: ExtendedClient) {
  if (!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;

  const [cmd, ...args] = message.content
    .trim()
    .slice(client.prefix.length)
    .split(/ +/g);
  const command = client.commands.get(cmd.toLowerCase());

  if (!command) return;

  try {
    const options = {
      client,
      message: message,
      args: args,
    };
    await command.messageExecute(options);
  } catch (e) {
    return message.channel.send(`Ошибка: \`${e.message}\``);
  }
}
