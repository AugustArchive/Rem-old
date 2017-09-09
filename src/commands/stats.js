const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const version = 'Prod-Remv1.0';
const container = 'Prod-Rem';
const os = require('os');
const hd = require('humanize-duration');
let colour = 'ADD8E6';

exports.run = (bot, msg) => {
  const embed = new RichEmbed()
  .setTitle(`**>** Rem Stats!`)
  .setDescription(`**>** Uptime: ${hd(bot.uptime, { round: true })}`)
  .addField("**>** Misc", `
  > Guilds: ${bot.guilds.size}
  > Users: ${bot.users.size.toLocaleString()}
  > Channels: ${bot.channels.size.toLocaleString()}
  > Voice Connections: ${bot.voiceConnections.size}
  `, true)
  .addField("**>** VPS", `
  > Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed()}MB
  > OS: ${os.platform()}
  > Cores: ${os.cpus().length}
  > Library: [discord.js](https://discord.js.org)
  > Discord.js Version: v${Discord.version}
  > Node.js Version: ${process.version}
  > Rem Version: ${version}
  > Container: ${container}
  `, true)
msg.channel.send({embed});
};