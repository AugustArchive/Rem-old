const { RichEmbed: RemEmbed } = require('discord.js');
const commandLength = require('../commands').length;

exports.run = (bot, msg, args) => {
    function embed() {
        const embed = new RemEmbed()
           .setTitle('Rem -> Commands')
           .setDescription(`Use \`!r.<command>\` to use a command\n\nThere are ${commandLength} total commands to use!`)
           .addField("Moderation", '`ban` `kick`')
           .addField('Common', '`help` `inviteme` `donate` `ping`')
    }
    msg.channel.send(embed());
}