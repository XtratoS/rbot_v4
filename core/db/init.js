
const mongoose = require('mongoose');
const guildSchema = require('./schemas/guild');
const recycleBinChannelSchema = require('./schemas/recycleBinChannel');
const recyclableChannelSchema = require('./schemas/recyclableChannel');
const modMailMemberSchema = require('./schemas/modMailMember');


module.exports = async function (_bot) {
  if (!_bot.db) _bot.db = {
    models: {},
    data: {}
  };
  if (!_bot.db.models) _bot.db.models = {};
  if (!_bot.db.data) _bot.db.data = {};

  let initGuilds = async (bot) => {
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

    bot.db.models.guild = guildModel;
    bot.db.data.guilds = guilds;
  };
  console.log('Loading Server Prefixes');
  await initGuilds(_bot);

  let initRecycleBin = async (bot) => {
    return new Promise(async (resolve) => {
      const recycleBinChannelModel = mongoose.model('recycleBinChannel', recycleBinChannelSchema);
      const recycleBinChannels = await recycleBinChannelModel.find();

      bot.db.models.recycleBinChannel = recycleBinChannelModel;
      bot.db.data.recycleBinChannels = {};
      recycleBinChannels.forEach(channel => {
        bot.db.data.recycleBinChannels[channel._id] = channel;
      });
      resolve();
    });
  }
  console.log('Loading Recycle Bin Channels');
  await initRecycleBin(_bot);

  let initRecyclableChannels = async (bot) => {
    return new Promise(async (resolve) => {
      const recyclableChannelModel = mongoose.model('recyclableBinChannel', recyclableChannelSchema);
      const recyclableBinChannels = await recyclableChannelModel.find();

      bot.db.models.recyclableBinChannel = recyclableChannelModel;
      bot.db.data.recyclableBinChannels = {};
      recyclableBinChannels.forEach(channel => {
        bot.db.data.recyclableBinChannels[channel._id] = channel;
      });
      resolve();
    });
  }
  console.log('Loading Recyclable Channels');
  await initRecyclableChannels(_bot);

  let initModMailMembers = async (bot) => {
    return new Promise(async (resolve) => {
      const modMailMemberModel = mongoose.model('modMailMember', modMailMemberSchema);
      const modMailMembers = await modMailMemberModel.find();

      bot.db.models.modMailMember = modMailMemberModel;
      bot.db.data.modMailMembers = {};
      modMailMembers.forEach(member => {
        if (!bot.db.data.modMailMembers[member.guildId]) {
          bot.db.data.modMailMembers[member.guildId] = []
        };
        bot.db.data.modMailMembers[member.guildId].push(member);
      });
      resolve();
    });
  }
  initModMailMembers(_bot);
  
  // console.log(_bot.db);
}