const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  stadium: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' }],
  positions: [{
    type: String,
    ref: "VotePosition"
  }]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
