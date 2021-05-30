module.exports = function(message, bot) {
  if (message.author.bot) {
    return;
  }
  
  if (message.channel.type === 'dm') {
    return;
  }
  
  let guildPrefix;
  try {
    let guildId = message.channel.guild.id;
    guildPrefix = bot.db.data.guilds[guildId].prefix;
  } catch (error) {
    console.error('error while retreiving guild prefix: ', error);
  }

  let commandName = message.content.split(' ')[0].substring(guildPrefix.length);
  
  let command;
  if (bot.commands.get(commandName)) {
    command = bot.commands.get(commandName);
  } else if (bot.aliases.get(commandName)) {
    command = bot.commands.get(bot.aliases.get(commandName));
  }

  command(bot, message);
}