const { Client } = require('discord.js');
const config = require('./lib/config.json');
let bot = new Client({ disableEveryone: true, autoReconnect: true });

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
    "With my Umbreon plushie!"
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
  bot.setInterval(setGame, 50000);
  console.log(`[READY] ${bot.user.username} is ready!`);
});

bot.on('guildCreate', (guild) => {
  bot.channels.get('358052869515116548').send(`🆕 **|** Joined a new guild!\n\`\`\`asciidoc\n= Guild Infomation =\nGuild Name (ID)     :: ${guild.name} (${guild.id})\`\`\``);
  console.log(`[LEFTED GUILD] Rem joined a new guild!\n${guild.name} (${guild.id})`);
  // postServerStats();
});

bot.on('guildDelete', (guild) => {
  bot.channels.get('358052869515116548').send(`:x: **|** Left a new guild!\n\`\`\`asciidoc\n= Guild Infomation =\nGuild Name (ID)     :: ${guild.name} (${guild.id})\`\`\``);
  console.log(`[LEFTED GUILD] Rem lefted a new guild!\n${guild.name} (${guild.id})`);
  // postServerStats();
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