const Stadium = require('../models/Stadium');
exports.get = (req, res) => {
  Stadium.find({})
    .then((stadiums) => {
      res.send(stadiums);
    });
};

exports.getDetail = (req, res, data, vueOptions) => {
  Stadium.findById(req.params.id)
    .then((stadium) => {
      res.send(stadium);
    });
};
exports.create = (req, res, data, vueOptions) => {
  var stadium = new Stadium();
  stadium.name = req.body.name;
  stadium.team = req.body.team;
  return stadium.save()
    .then((doc) => {
      res.send(doc);
    });
};
