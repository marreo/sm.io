const mongoose = require('mongoose');

const facitSchema = new mongoose.Schema({
  stadium: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium' },
  asString: String,
  createdAt: Date
});

const Facit = mongoose.model('Facit', facitSchema);

module.exports = Facit;
