const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textSchema = new Schema({
  text: String,
  created_at: Date
});

const TextModel = mongoose.model('text', textSchema);

module.exports = {
  TextModel
};