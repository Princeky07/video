const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  id: {type: String, required: true},
  title: {type: String, required: true},
  subtitle: {type: String},
  imageUrl: {type: String}
});

module.exports = mongoose.model('Video', schema);