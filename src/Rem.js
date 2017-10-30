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
  
  snek.post(`https://list.passthemayo.space/api/bots/${bot.user.id}`)
      .set("Authorization", config.api_keys.mayoBotList)
      .send({ server_count: bot.guilds.size })
      .then(console.log(`[list.passthemayo.space] Posted stats!`))
      .catch(e => console.error(e.stack))
}

bot.login(config.api_keys.Discord);

function setGame() {
  let games = [
    "With August! OwO",
    "With a ball of yarn!",
    "With Aqua-sama",
    "With Mio-chan",
    "Facing Ayana",
    "With my Lucario plush!",
    "With my Umbreon plushie!",
    "With Wessel! OwO",
    "With Hansen! OwO",
    "With Desii! OwO",
    "With Mantaro-chan",
    "Tsumiki boat exists? [https://polr.me/TsumikiBoat]"
  ];
  bot.user.setPresence({
    status: 'online',
    afk: 'false',
    game: {
      name: `!r.help | ${games[Math.floor(Math.random() * games.length)]} | ${bot.guilds.size} guilds!`,
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
    bot.channels.get('358052869515116548').send(`
   __**Rem joined a new guild!**__
   
   \`Guild Name\`: ${guild.name}
   \`Guild Members\`: ${guild.memberCount}
   \`Guild ID\`: ${guild.id}
   \`Guild Owner\`: ${guild.owner.user.tag}
   `);
  console.log(`[GUILD]: Rem has joined a guild!\nGuild Name: ${guild.name}\nGuild ID: ${guild.id}\nGuild Members: ${guild.memberCount}\nGuild Owner: ${guild.owner.user.tag}`);
  postServerStats();
});

bot.on('guildDelete', (guild) => {
   bot.channels.get('358052869515116548').send(`
   __**Rem left a new guild!**__
   
   \`Guild Name\`: ${guild.name}
   \`Guild Members\`: ${guild.memberCount}
   \`Guild ID\`: ${guild.id}
   \`Guild Owner\`: ${guild.owner.user.tag}
   `);
  console.log(`[GUILD]: Rem lefted a new guild!\n${guild.name} (${guild.id})`);
  postServerStats();
});

bot.on("guildMemberAdd", (member) => {
   if (member.guild.id != '332957805432799243') return;
   
   bot.channels.get("358860760308252672").send(`<@${member.user.id}> joined the server; Make sure to read <#357022020115890189> for infomation!`);
   
   let role = member.guild.roles.find('name', 'Students');
   
   member.addRole(role);
});

bot.on("guildMemberRemove", (member) => {
   if (member.guild.id != '332957805432799243') return;
   
   bot.channels.get("358860760308252672").send(`<@${member.user.id}> left the server..`);
});

bot.on('message', (msg) => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length)

    try {
     let commandFile = require(`./commands/${command}.js`)
     commandFile.run(bot, msg, args)
     console.log(`[COMMAND]: ${msg.author.username} used command ${msg.content}`);
    } catch (err) {
      console.error(`[COMMAND ERROR] Command Error!\n${err.stack}`);
   }
});

bot.on('error', e => logger.error(e.stack));
bot.on('warn', e => logger.warn(e.stack));
process.on('unhandledRejection', e => {
  console.error();
});