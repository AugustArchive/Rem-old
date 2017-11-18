exports.run = (bot, msg) =>
{
  msg.channel.send('Pinging...').then((mes) =>
  {
    mes.edit(`Pong! API Latency is \`${Math.trunc(bot.ping)}ms\` and it took \`${mes.createdTimestamp - msg.createdTimestamp}ms\` to get this message!`);
  });
};