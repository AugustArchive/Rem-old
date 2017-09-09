const { RichEmbed } = require('discord.js');
const color = 'ADD8E6';

exports.run = (bot, msg) => {
  const embed = new RichEmbed()
    .setTitle(`Rem: Commands`)
    .setDescription(`Use \`r/[command]\` to use a command!`)
    .setColor(color)
    .addField(`:notes: - Music`, '**Coming Soon**', true)
    .addField(`:hammer_pick: - Developer`, '`exec` `eval`', true)
    .addField(`:gear: - Utility`, '`serverinfo` `stats` `uptime`', true)
    .addField(`:rofl: - Fun`, '`neko` `ascii` `lewd`', true)
    .setTimestamp()
  msg.channel.send({embed});
};