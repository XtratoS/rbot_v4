mongoose = require('mongoose');
guildSchema = require('./schemas/guild');

module.exports = async function (bot) {
  const guildModel = mongoose.model('Guild', guildSchema);

  const dbGuildsQuery = await guildModel.find();
  const dbGuilds = {};
  dbGuildsQuery.forEach(dbGuild => {
    dbGuilds[dbGuild._id] = dbGuild;
  });

  bot.guilds.cache.each(botGuild => {
    if (dbGuilds[botGuild.id]) return;
    new guildModel({
      name: botGuild.name,
      _id: botGuild.id,
    }).save((err) => {if (!err) return; console.error(err);});
  });

  console.log(dbGuilds);
}