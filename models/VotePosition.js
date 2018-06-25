const mongoose = require('mongoose');

const votePosSchema = new mongoose.Schema({
  position: Number,
  type: Number,
  vote: {
    type: String,
    ref: "Vote"
  }
});

const VotePosition = mongoose.model('Vote', votePosSchema);

module.exports = VotePosition;
