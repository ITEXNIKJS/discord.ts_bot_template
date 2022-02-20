import { MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
  name: "test1",
  userPermissions: ["MANAGE_MESSAGES"],
  cooldown: 60,
  options: [
    {
      type: "SUB_COMMAND",
      name: "test1",
      description: "test1",
    },
  ],
  description: "test",
  run: async ({ interaction }) => {
    const roles = interaction.guild.roles.cache
      .map((role) => {
        return {
          label: role.name,
          value: role.id,
        };
      })
      .filter((role) => {
        return (
          role.label !== "@everyone" &&
          interaction.guild.me.roles.botRole.name !== role.label
        );
      });

    const panelEmbed = new MessageEmbed()
      .setTitle("ROLE SELECTOR")
      .setColor("RED");

    const components = [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("reaction-roles")
          .setMaxValues(3)
          .setMinValues(0)
          .addOptions(roles)
      ),
    ];

    interaction.followUp({ embeds: [panelEmbed], components });
  },
  messageExecute: async ({ client, message }) => {
    const roles = message.guild.roles.cache
      .map((role) => {
        return {
          label: role.name,
          value: role.id,
        };
      })
      .filter((role) => {
        return (
          role.label !== "@everyone" &&
          message.guild.me.roles.botRole.name !== role.label
        );
      });

    const panelEmbed = new MessageEmbed()
      .setTitle("ROLE SELECTOR")
      .setColor("RED");

    const components = [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("reaction-roles")
          .setMaxValues(3)
          .setMinValues(0)
          .addOptions(roles)
      ),
    ];

    message.reply({ embeds: [panelEmbed], components });
  },
});
