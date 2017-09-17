const { Client } = require('discord.js');
const config = require('./lib/config.json');
let bot = new Client({ disableEveryone: true, autoReconnect: true });
const snek = require("snekfetch");

function postServerStats() {
  snek.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
  .set("Authorization", config.api_keys.oliyBots)
  .send({
      server_count: bot.guilds.size
  })
  .then(console.log(`[discordbots.org] Posted stats!`))
  .catch(e => console.error(e.stack))
  
  snek.post(`http://discord.services/api/bots/${bot.user.id}/`)
  .set("Authorization", config.api_keys.directory)
  .send({ guild_count: bot.guilds.size })
  .then(console.log(`[discord.services] Posted stats!`))
  .catch(e => console.error(e.stack))
}

bot.login(config.api_keys.Discord);

function setGame() {
  let games = [
    "With August! OwO",
    `On ${bot.guilds.size} guilds!`,
    "With a ball of yarn!",
    "With Aqua-sama",
    "With Mio-chan",
    "Facing Ayana",
    "With my Lucario plush!",
    "With my Umbreon plushie!",
    "With Wessel! OwO",
    "With Hansen! OwO",
    "With Desii! OwO",
    "With Mantaro-chan"
  ];
  bot.user.setPresence({
    status: 'online',
    afk: 'false',
    game: {
      url: 'https://twitch.tv/discordapp',
      name: `r/help | ${games[Math.floor(Math.random() * games.length)]} [${bot.guilds.size}]`,
      type: 0
    }
  });
}

bot.on('ready', () => {
  setGame();
  postServerStats();
  bot.setInterval(setGame, 50000);
  console.log(`[READY] ${bot.user.username} is ready!`);
});

bot.on('guildCreate', (guild) => {
  bot.channels.get('358052869515116548').send(`🆕 **|** Joined a new guild!\n\`\`\`asciidoc\n= Guild Infomation =\nGuild Name (ID)     :: ${guild.name} (${guild.id})\`\`\``);
  console.log(`[LEFTED GUILD] Rem joined a new guild!\n${guild.name} (${guild.id})`);
  postServerStats();
});

bot.on('guildDelete', (guild) => {
  bot.channels.get('358052869515116548').send(`:x: **|** Left a new guild!\n\`\`\`asciidoc\n= Guild Infomation =\nGuild Name (ID)     :: ${guild.name} (${guild.id})\`\`\``);
  console.log(`[LEFTED GUILD] Rem lefted a new guild!\n${guild.name} (${guild.id})`);
  postServerStats();
});

bot.on('message', (msg) => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length)

    try {
     let commandFile = require(`./commands/${command}.js`)
     commandFile.run(bot, msg, args)
    } catch (err) {
      console.error(`[COMMAND ERROR] Command Error!\n${err.stack}`);
   }
});

bot.on('error', e => logger.error(e.stack));
bot.on('warn', e => logger.warn(e.stack));
process.on('unhandledRejection', e => {
  console.error(`[UNHANDLEDREJECTION]\n${e.stack}`);
});