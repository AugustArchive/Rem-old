const { Client: RemClient } = require('discord.js'),
      config = require('./config.json'),
      snek = require('snekfetch');
      
const bot = new RemClient({ disableEveryone: true });

connect();

function postServerStats() {
   snek.post('https://discordbots.org/api/bots/' + bot.user.id + '/stats')
       .set("Authorization", config.api_keys.oliyBots)
       .send({
         shard_count: bot.shard.count,
         shard_id: bot.shard.id,
         server_count: bot.guilds.size
       })
       .end();
       
   snek.post('https://bots.discord.pw/api/bots/' + bot.user.id + '/stats')
       .set("Authorization", config.api_keys.oliyBots)
       .send({
         server_count: bot.guilds.size
       })
       .end();
       
   snek.post('https://botlist.space/api/bots' + bot.user.id)
       .set("Authorization", config.api_keys.mayoBots)
       .send({
         server_count: bot.guilds.size
       })
       .end();
}

bot.on('ready', () => {
  bot.user.setPresence({
    afk: false,
    status: 'online',
    game: {
       name: `${config.prefix}help | Shard ${bot.shard.id}`,
       type: 0
    }
  });
  console.log(`[SYSTEM]: RemBoat is ready!\nShard ${bot.shard.id} was loaded too.`);
  postServerStats();
});

bot.on('guildCreate', (g) => {
   bot.channels.get('358052869515116548').send(`
      __**RemBoat joined a new guild!**__
      
      Guild Name: ${g.name}
      Guild ID: ${g.id}
      Guild Owner: ${g.owner}/${g.owner.user.tag}
      Guild Members Length: ${g.memberCount}
      Now At: ${bot.guilds.size}
   `);
   console.log(`[GUILD]: Joined ${g.name}.`);
});

bot.on('guildDelete', (g) => {
   bot.channels.get('358052869515116548').send(`
      __**RemBoat lefted a new guild!**__
      
      Guild Name: ${g.name}
      Guild ID: ${g.id}
      Guild Owner: ${g.owner}/${g.owner.user.tag}
      Guild Members Length: ${g.memberCount}
      Now At: ${bot.guilds.size}
   `);
   console.log(`[GUILD]: Lefted ${g.name}.`);
});

bot.on('message', (msg) => {
   const mentionPrefix = new RegExp(`^<@!?${bot.user.id}> `);
   if (!msg.content.startsWith(config.prefix) || !msg.content.startsWith(mentionPrefix) || msg.author.bot) return;
   
   const args = msg.content.split(" ");
   const command = args.shift().slice(config.prefix.length || mentionPrefix.length);
   
   try {
     const RemCommands = require('./commands' + command + '.js');
     RemCommands.run(bot, msg, args);
   } catch(err) {
     msg.channel.send(`Sorry! \`${command}\` executed wrong, this will inform the owner.`);
     bot.channels.get('380885752290082818').send(`
        ${msg.author.username} tried to use \`${command}\` but you executed it wrong! :(
        \`\`\`js\n${err.name}: ${err.message} | ${err.stack}\`\`\`
     `);
   }
});

function connect() {
  return bot.login(config.api_keys.Discord);
}