let fidget = require('figlet');
let config = require('../lib/config.json');

exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("You need an argument!\n\n**Current Argument**: `message`");
  fidget(args.join(" "), (err, data) => {
   if (args.length > 9) return msg.reply("I only support 9 characters!");
   if (err) return msg.channel.send(`\`\`\`js\n${err.body}\`\`\`\nReport to dev!\n${config.invite}`);
   msg.channel.send(data, { code: 'asciidoc' });
  });
};