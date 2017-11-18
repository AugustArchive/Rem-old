const { ShardingManager: RemShard } = require('discord.js');
const config = require('./config.json');
const Shard = new RemShard(`${__dirname}/Rem.js`, {
  token: config.api_keys.Discord.login,
  maxShards: "auto"
});

Shard.spawn();

Shard.on('launch', (s) => console.log(`[SHARD]: Shard ${s.id} launched.`));