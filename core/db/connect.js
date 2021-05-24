mongoose = require('mongoose');

module.exports = function () {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function() {
    console.log('MongoDB Connected...');
  }).catch(function(error) {
    console.error('Error:', error);
  });
}