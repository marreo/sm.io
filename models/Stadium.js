const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  name: String,
  team: String
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;