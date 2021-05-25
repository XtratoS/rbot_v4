mongoose = require('mongoose');
guildSchema = require('./schemas/guild');

module.exports = async function (bot) {
  if (!bot.db) bot.db = {
    models: {},
    data: {}
  };
  if (!bot.db.models) bot.db.models = {};
  if (!bot.db.data) bot.db.data = {};

  let initGuilds = () => {
    // initialize model
    const guildModel = mongoose.model('Guild', guildSchema);
    const guilds = {};

    // get all existing documents
    (await guildModel.find()).forEach(guild => {
      guilds[guild._id] = guild
    });

    // determine documents we need to insert
    const guildsToInsert = [];
    bot.guilds.cache.each(guild => {
      if (guilds[guild.id]) return;
      guildsToInsert.push({
        name: guild.name,
        _id: guild.id
      });
    });

    // insert missing documents
    await guildModel.insertMany(guildsToInsert, function(error, docs) {
      if (error) console.error(error);
      docs.forEach((doc) => {
        guilds[doc._id] = doc;
      });
    });
  };
  initGuilds();
}