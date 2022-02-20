import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  description: "123",
  run: async ({ interaction }) => {
    interaction.followUp("Pongsssss");
  },
  messageExecute: async ({ client, message }) => {
    message.reply("ping - " + client.ws.ping);
  },
});
