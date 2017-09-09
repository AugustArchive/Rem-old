const { exec } = require('child_process');
const { RichEmbed } = require('discord.js');
let config = require('../lib/config.json');

exports.run = (bot, msg, args) => {
  if (msg.author.id != config.devs) return msg.reply("Need to be a dev!");
  if (args.length < 1) return msg.reply("Need code to execute!");
  
  exec(args.join(" "), (err, stderr, stdout) => {
    const errEmbed = new RichEmbed()
      .setDescription(`\`\`\`sh\n${stderr}\`\`\``)
      .setColor(`RED`)
      .setTimestamp()
    if (err) return msg.channel.send({embed: errEmbed});
    const embed = new RichEmbed()
      .setDescription(`\`\`\`sh\n${stdout}\`\`\``)
      .setColor(`GREEN`)
      .setTimestamp()
    msg.channel.send({embed: embed});
  });
};