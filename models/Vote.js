const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  positions: [{
    type: String,
    ref: "VotePosition"
  }]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
