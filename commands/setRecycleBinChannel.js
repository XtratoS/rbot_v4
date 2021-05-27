module.exports = async (bot, message) => {
  let args = message.content.split(' ');
  try {
    let channelId = args[1];
    let channelObject = message.guild.channels.resolve(channelId);
    if (!channelObject) return message.reply(`Couldn't fetch channel with id ${channelId}`)
    bot.db.models.recycleBinChannel.create({
      _id: message.channel.id,
      guildId: message.channel.guild.id
    }, function(error, newDoc) {
      if (error) return console.error(error);
      message.reply(`Channel <#${newDoc.channelId}> has been set as this server's Recycle Bin Channel`);
    });
  } catch (error) {
    console.error(error);
    message.reply('Error while fetching channel, make sure you are using a correct channel id')
      .catch(console.error);
  }
}