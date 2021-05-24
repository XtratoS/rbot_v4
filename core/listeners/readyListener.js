const Discord = require('discord.js');
const commands = require('../../commands');
const dbConnect = require('../db/connect');
const dbInit = require('../db/init');

module.exports = async function(bot) {
  bot.commands = new Discord.Collection();
  bot.aliases = new Discord.Collection();
  bot.commandRoles = new Discord.Collection();
  bot.commandPermissions = new Discord.Collection();

  console.log('====Started loading commands====');
  console.group();
  for (let commandName in commands){
    bot.commands.set(commandName, commands[commandName].command);
    bot.commandRoles.set(commandName, commands[commandName].requiredRoles);
    bot.commandPermissions.set(commandName, commands[commandName].requiredPermissions);
    for (let alias of commands[commandName].aliases) {
      bot.aliases.set(alias, commandName);
    }
    console.log(`Loaded command ${commandName} successfully.`);
  }
  console.groupEnd();
  console.log('====Finished loading commands====');
  await dbConnect();
  dbInit(bot);
}