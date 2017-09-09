const { RichEmbed } = require('discord.js');
const color = 'ADD8E6';

exports.run = (bot, msg) => {
  const embed = new RichEmbed()
    .setTitle(`${bot.user.username} - Help`, bot.user.avatarURL)
    .setDescription(`Hello! :wave: I am Rem, the discord bot!\nI was made by <@280158289667555328>!\nTo use my commands, do \`r/commands\` for command list.`)
    .setColor(color)
    .addField(`:desktop: Website`, "Soon:tm:", true)
    .addField(`:sos:`, 'View commands at `r/commands`!', true)
    .setTimestamp()
    .setFooter(`Rem, the discord bot.`)
  msg.channel.send({embed});
};