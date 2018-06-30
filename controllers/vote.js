var Vote = require('../models/Vote');
var Facit = require('../models/Facit');
const moment = require('moment');

exports.getFacit = (req, res) => {
  Facit.findOne({
      stadiumId: 99
    }, null, {sort: { createdAt: -1 }})
    .then((facit) => {
      if(facit != null) {
        res.send(facit.asString.split(','));
      }
      res.send([]);
    });
};

exports.admin = (req, res, data, vueOptions) => {
  var facit = req.body.facit.map(a => a.p).toString();
  var newFacit = new Facit();
  newFacit.asString = facit;
  newFacit.stadiumId = 99;
  newFacit.createdAt = new Date();
  return newFacit.save()
    .then((doc) => {
      res.send(facit);
    });
};

exports.post = (req, res, data, vueOptions) => {
  var result = {
    path: correctPath
  };
  res.send(result);
};
