const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  _id: String,
  name: String,
  prefix: {
    type: String,
    default: '!'
  }
});