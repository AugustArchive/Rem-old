const hd = require('humanize-duration');
exports.run = (bot, msg) => {
  msg.channel.send(`Uptime: ${hd(bot.uptime, { round: true })}`);
};