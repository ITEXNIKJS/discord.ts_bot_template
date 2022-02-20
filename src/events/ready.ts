import ytNotification from "../common/utils/ytNotification";
import { Event } from "../structures/Events";

const yt = ["UCIpYjbywLIlWE4vV_rdqFPw"];

export default new Event("ready", (client) => {
  yt.forEach((ytID) => {
    new ytNotification(ytID, "669579257428705290", "498227052026134539");
  });

  console.log(`[START LOG] ${client.user.tag} успешно запущен`);
});
