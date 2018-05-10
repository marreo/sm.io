const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  q: Number,
  d: Date
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
