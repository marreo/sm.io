const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  stadiumId: Number,
  positions: [new mongoose.Schema({
    position: Number,
    type: Number
  })]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;