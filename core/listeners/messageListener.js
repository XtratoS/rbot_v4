module.exports = function(message, bot) {
  if (message.author.bot) {
    return;
  }
  if (message.channel.type === 'dm') {
    return;
  }

  let messageContent = message.content;
  console.log(messageContent);
}