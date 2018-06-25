const mongoose = require('mongoose');

const facitSchema = new mongoose.Schema({
  asString: String,
  stadiumId: Number
});

const Facit = mongoose.model('Facit', facitSchema);

module.exports = Facit;
