const { Client: RemClient } = require('discord.js'),
      config = require('./config.json'),
      snek = require('snekfetch'),
      { version } = require('./package.json');
      bot = new RemClient({ disableEveryone: true });
      
function postServerStats() {
   // post to discordbots.org
   snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
   .set("Authorization", config.api_keys.oliyBots)
   .send({
     server_count: bot.guilds.size,
     shard_id: bot.shard.id,
     shard_count: bot.shard.count
   })
   .then(console.log('[discordbots.org]: Posted Stats!'))
   .catch(e => console.error(e.body));
   /*
   // post to bots.discord.pw
   snekfetch.post(`https://bots.discord.pw/api/bots/${bot.user.id}/stats`)
   .set("Authorization", config.api_keys.discordBoats)
   .send({
     server_count: bot.guilds.size
   })
   .then(console.log('[bots.discord.pw] Posted Stats!'))
   .catch(e => console.error(e.body))
   */
}


bot.on('ready', () => {
  bot.user.setPresence({
    afk: false,
    status: 'online',
    game: {
      name: `!r.help | ohlookitsaugust.space/rem/`,
      type: 0
    }
  });
  console.log(`[SYSTEM]: ${bot.user.username} v${version} is ready!`);
  postServerStats();
});

bot.on('guildCreate', guild => {
  // postServerStats();
  try {
    bot.guilds.get(`${guild.id}`).channels.find('name', 'general').createInvite({ maxUses: 5 }).then((inv) => {
      bot.channels.get('358052869515116548').send(`
         __**Rem joined a new guild!**__
   
         \`Guild Name\`: ${guild.name}
         \`Guild Members\`: ${guild.memberCount}
         \`Guild ID\`: ${guild.id}
         \`Guild Owner\`: ${guild.owner.user.tag}
         \`Now at\`: ${bot.guilds.size}
         \`Invite\`: https://discord.gg/${inv.code}
      `);
    });
  } catch(e) {
      bot.channels.get('358052869515116548').send(`
         __**Rem joined a new guild!**__
   
         \`Guild Name\`: ${guild.name}
         \`Guild Members\`: ${guild.memberCount}
         \`Guild ID\`: ${guild.id}
         \`Guild Owner\`: ${guild.owner.user.tag}
         \`Now at\`: ${bot.guilds.size}
         \`Invite\`: \`${e.name}:${e.message}\`
      `);
  }
});

bot.on('guildDelete', guild => {
  // postServerStats();
   bot.channels.get('358052869515116548').send(`
   __**Rem lefted a new guild!**__
   
   \`Guild Name\`: ${guild.name}
   \`Guild Members\`: ${guild.memberCount}
   \`Guild ID\`: ${guild.id}
   \`Guild Owner\`: ${guild.owner.user.tag}
   \`Now at\`: ${bot.guilds.size}
   `);
});

bot.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;

  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);

  try {
     let commandFile = require(`./commands/${command}.js`);
     commandFile.run(bot, msg, args);
     console.log(`[COMMAND]: ${msg.author.username} ~> ${msg.content}`);
    } catch (err) {
      msg.channel.send({
        embed: {
          title: 'Rem made your command into a error!',
          description: 'Sorry! **`' + command + '`** executed a error!',
          fields: [{
            name: 'Details:',
            value: `\`\`\`js\n${err.name}:${err.message}\n\n${err.stack}\`\`\``,
            inline: false
          }]
        }
      }).catch(e => {
         msg.channel.send('Sorry; My error logs are too big, it\'s been executed to my console!');
         throw new Error('Command Error: ' + err.stack);
      });
      console.error(`[COMMAND]: An error occured while running ${command}\n\nError: ${err.message}\n\nTraceback: ${err.stack}`);
   }
});

bot.on('error', e => {
    console.error(`[ERROR]: ${e.name}:${e.message}`);
});

bot.on('warn', e => { 
    console.warn(`[WARNING]: ${e.name}:${e.message}`);
});

process.on('unhandledRejection', e => {
  console.error(`[WARNING]: ${e.name}:${e.message}`);
});

bot.login(config.api_keys.Discord.login);