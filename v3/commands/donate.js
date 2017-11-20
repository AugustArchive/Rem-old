const { RichEmbed: RemEmbed } = require('discord.js');
const config = require('../config.json');

exports.run = (bot, msg, args) => {
   if (args.length < 1) {
    return msg.channel.send(`
    __**Donating**__
    
    You can use \`-perks\` arguments to see what perks you get for donating on Patreon! woo :tada:
    
    __**Links**__
    
    Patreon: https://patreon.com/ohlookitsAugust
    Paypal: <https://paypal.com/ohlookitsAugust>
    Ko-fi: https://ko-fi.com/ohlookitsAugust
    `);
   } else {
    const query = args.join(' ');

     if (query.startsWith('-perks')) {
       const embed = new RemEmbed()
         .setTitle('Patreon Perks!')
         .setColor(config.settings.embedColour)
         .addField('$1 Dollar: Friend', '`Patron! Role` and `Donator commands`')
         .addField('$3 Dollars: Woah! Supportive.', '`Previous rewards`, `Custom Tags`, and a Patron lounge!')
         .addField('$6 Dollars: A fan', '`Previous rewards` and `Patreon Bot! (Of your choice!)`')
         .addField('$10 Dollars: BOOM!', 'Previous rewards :I')
         .setFooter('Rem: A Discord Bot (Made by August#1793)');
        return msg.channel.send({ embed });
        }
   }
};