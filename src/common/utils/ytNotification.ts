import { MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { client } from "../..";

const Parser = require("rss-parser");
const parser = new Parser();

export default class ytNotification {
  private save = [];

  constructor(ytID: string, channelID: string, guildID: string) {
    this.Scan(ytID, channelID, guildID);

    this.Start(ytID).then(() =>
      setInterval(async () => this.Scan(ytID, channelID, guildID), 360000)
    );
  }

  protected async Start(ytID: string) {
    let feed = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${ytID}`
    );

    const ID = feed.items[0].id;

    if (this.save.includes(ID)) return;

    this.save.push(ID);
  }

  protected async Scan(ytID: string, channelID: string, guildID: string) {
    let feed = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${ytID}`
    );

    const feedData = feed.items[0];

    if (this.save.includes(feedData.id)) return;
    this.save.push(feedData.id);

    const channel = client.guilds.cache
      .get(guildID)
      .channels.cache.find((x) => x.id === channelID) as TextChannel;

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Смотреть ролик")
        .setStyle("LINK")
        .setURL(`${feedData.link}`)
    );

    channel.send({
      // embeds: [embed],
      components: [row],
      content: `**Текст ${feedData.link}`,
    });
  }
}
