const Vote = require('../models/Vote');
const Facit = require('../models/Facit');
const moment = require('moment');
const _ = require('lodash');

Array.prototype.groupBy = function (funcProp) {
  return this.reduce(function (acc, val) {
    (acc[funcProp(val)] = acc[funcProp(val)] || []).push(val);
    return acc;
  }, {});
};

function compareByValue(a, b) {
  if (a.value < b.value)
    return 1;
  if (a.value > b.value)
    return -1;
  return 0;
}

exports.getFacit = (req, res) => {
  Facit.findOne({
      stadiumId: 99
    }, null, {
      sort: {
        createdAt: -1
      }
    })
    .then((facit) => {
      if (facit != null) {
        res.send(facit.asString.split(','));
      }
      res.send([]);
    });
};

exports.getResultForStadium = (req, res) => {
  //Get all votes for a specific stadium
  Vote.find({
      stadiumId: 99
    })
    .then((votes) => {
      if (votes != null && votes.length > 0) {
        //Count num of votes for each type - for each (vote)position
        //--> Result should be an array with positions that has a vote, and the type that has the most votes
        // <-- List with all votes per positions, next step count which type has most votes

        var result = [];
        var positions = votes.map(a => a.positions).reduce((acc, val) => acc.concat(val), []);
        var votesPerPosition = positions.groupBy(function (c) {
          return c.position;
        });

        for (let index = 0; index < Object.values(votesPerPosition).length; index++) {
          const votesPerPositionArr = Object.values(votesPerPosition)[index];
          var types = votesPerPositionArr.map(a => a.type);
          var countByType = _.countBy(types);
          var positionKey = Object.keys(votesPerPosition)[index];

          var countObjects = [];
          for (var key in countByType) {
            if (countByType.hasOwnProperty(key)) {
              countObjects.push({
                key: key,
                value: countByType[key]
              });
            }
          };
          var sortedCount = countObjects.sort(compareByValue);
          result.push({
            position: parseInt(positionKey),
            type: parseInt(sortedCount[0].key)
          });
        }
        res.send(result);
      }
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
  var vote = new Vote();
  vote.stadiumId = 99;
  for (let index = 0; index < req.body.facit.length; index++) {
    const element = req.body.facit[index];
    var votePosition = {
      position: element.p,
      type: element.t
    };
    vote.positions.push(votePosition);
  }
  vote.save()
    .then((doc) => {
      var result = {
        path: []
      };
      res.send(result);
    });
};