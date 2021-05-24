const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  name: String,
  _id: String,
  prefix: {type: String, default: '!'},
});