const mongoose = require('mongoose');

const facitSchema = new mongoose.Schema({
  asString: String,
  stadiumId: Number,
  createdAt: Date
});

const Facit = mongoose.model('Facit', facitSchema);

module.exports = Facit;
