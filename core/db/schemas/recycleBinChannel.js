const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  _id: String,
  guildId: {
    type: String,
    ref: 'Guild'
  }
});