const config = require('../lib/config.json');
const snekfetch = require('snekfetch');

exports.run = (bot, msg, args) => {
  if (msg.author.id != '280158289667555328') return msg.reply("You need a permission!: `Developer`.")
  if (args.length < 1) return msg.reply("Need code to execute!");

  try {
  const code = args.join(" ");
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);

  msg.channel.send(clean(evaled), {code: "js" });
   } catch (err) {
    msg.channel.send(`An error has occured!\`\`\`js\n${clean(err)}\n\`\`\``);
  }
};

function clean(text) {
  if (typeof(text) === 'string')
  return text.replace(/`/g, "`" + String.fromCharCode(8203).replace(/@/g, "@" + String.fromCharCode(8203)));
  else
      return text;
}