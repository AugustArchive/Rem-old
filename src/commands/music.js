const yt = require("ytdl-core");
let colour = 'ADD8E6';
const ytAPI = require("simple-youtube-api");
const cfg = require('../lib/config.json');
import { RichEmbed } from 'discord.js';
const YouTube = new ytAPI(cfg.api_keys.Youtube);

exports.run = (bot, msg, args) => {
   let help = new RichEmbed()
     .setTitle(`:musical_note: Rem Music Player`)
     .setDescription("Welcome to the highly *core* part of the Rem system:\nMUSIC!\n\nWarning: :warning: Most of this uses the `EMBED_LINKS` permission!")
     .addField("Music commands", 'Use `r/music [command] [args]` to use a command.\n`play`')
     .setColor(colour)
     .addBlankField(true)
     .setTimestamp()
     .setTitle(`Requested by ${msg.author.id}`);
  if (args.length < 1) return msg.channel.send({embed: help});

  if (msg.content.includes(` play`)) {
    let voiceChan = msg.member.voiceChannel;
    if (!voiceChan) return msg.reply("[**MUSIC**] You must be in a voice channel!");

    voiceChan.join()
    .then(connection => {
        YouTube.searchVideos(args.join(" "), 1).then(results => {
          let url = "https://youtube.com/watch?v=" + results[0].id;

          const streamOptions = { seek: 0, volume: 1, passes: 2 };
          const stream = yt(url, { filter : 'audioonly'});
          const dispatcher = connection.playStream(stream, streamOptions);

          yt.getInfo(url, function(err, info) {
            msg.channel.send(`[**MUSIC**] Now playing **${info.title}** requested by **${msg.author.tag}**`);

         dispatcher.on("end", () => {
           msg.channel.send("[**MUSIC**] Leaving voice channel! :<")
           voiceChan.leave();
          });
        });
      });
    });
  }
}