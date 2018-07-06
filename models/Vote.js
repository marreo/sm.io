const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  stadium: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' },
  positions: [{
    p: Number,
    t: Number
  }]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;