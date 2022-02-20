import { TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Event } from "../structures/Events";

export default new Event("guildMemberAdd", (client, member) => {
  const embed = new MessageEmbed()
    .setTitle(`PRINZESS | DISCORD`)
    .setDescription(
      `Приветствуем тебя на нашем сервере!\nПостоянная ссылка на канал: https://discord.club/i/Princess1\nБудем рады тебе и твоим друзьям!`
    )
    .setColor("RED");

  const pEmbed = new MessageEmbed()
    .setAuthor(`Замок Принцессы раста`)
    .setURL(
      `https://images-ext-1.discordapp.net/external/oVwt9vbSZlA7740m_-8CdU3GcUqnifTwMLDhUltISpo/%3Fwidth%3D67%26height%3D67/https/images-ext-2.discordapp.net/external/tzRvqgxgCvP9-CCwJOtXoYSRq00T4lbjUiw3k0jtl5s/https/yt3.ggpht.com/a/AATXAJxQT3DiKlbGG0tGWq5jJzX3z32soZP5KzbxvQ%253Ds100-c-k-c0xffffffff-no-rj-mo`
    )
    .setDescription(
      `
      Hello <@${member.id}>! 
      Добро пожаловать в дискорд, под названием **Королевство растеров**. 
      Мы рады приветствовать тебя здесь. Ознакомься с создателями и правилами сервера в канале <#606254195548618753>.
      
      Поздравляю! Ты стал **${
        member.guild.members.cache.filter((m) => !m.user.bot).size
      }** жителем королевства!`
    )
    .setColor("RED")
    .setThumbnail(
      `https://images-ext-1.discordapp.net/external/oVwt9vbSZlA7740m_-8CdU3GcUqnifTwMLDhUltISpo/%3Fwidth%3D67%26height%3D67/https/images-ext-2.discordapp.net/external/tzRvqgxgCvP9-CCwJOtXoYSRq00T4lbjUiw3k0jtl5s/https/yt3.ggpht.com/a/AATXAJxQT3DiKlbGG0tGWq5jJzX3z32soZP5KzbxvQ%253Ds100-c-k-c0xffffffff-no-rj-mo?width=45&height=45`
    );

  const channel = client.channels.cache.get(
    "736718974883987487"
  ) as TextChannel;
  channel.send({ embeds: [pEmbed] });
  member.roles.add("625754344360378368");
  member.send({ embeds: [embed] });
});
