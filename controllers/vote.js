var Vote = require('../models/Vote');
var Facit = require('../models/Facit');
const moment = require('moment');

exports.getFacit = (req, res) => {
  Facit.findOne({
      stadiumId: 99
    })
    .then((facit) => {
      res.send(facit.asString.split(','));
    });
};

exports.admin = (req, res, data, vueOptions) => {
  var facit = req.body.facit.map(a => a.p).toString();
  var newFacit = new Facit();
  newFacit.asString = facit;
  newFacit.stadiumId = 99;
  return newFacit.save()
    .then((doc) => {
      res.send(facit);
    });
};

exports.post = (req, res, data, vueOptions) => {

  //Hämta "facit"
  //Gå igenom varje objekt i facit
  //För varje facit-objekt gå igenom listan över objekt som är utritade (postas i param)
  //Om utritat objekt krockar med facit-objekt .. spara vilket facitobjekt o vilken typ av röst

  // var correctPath = [];
  // var drawData = req.body.path;
  // for (var i = 0; i < facitData.path.length; i++) {
  //   var currFacitElement = {
  //     left: facitData.path[i][1],
  //     top: facitData.path[i][2]
  //   };
  //   for (var j = 0; j < drawData.length; j++) {
  //     if (drawData[i]) {
  //       var currElement = {
  //         left: drawData[i][1],
  //         top: drawData[i][2]
  //       };
  //     }
  //     if (JSON.stringify(currFacitElement) !== JSON.stringify(currElement) && isOverlapping(currFacitElement, currElement)) {
  //       correctPath.push(facitData.path[i]);
  //       if (correctPath.length > 1) {
  //         for (var k = 0; k < correctPath.length; k++) {
  //           if (JSON.stringify(facitData.path[i]) !== JSON.stringify(correctPath[k]) ) {
  //             //Check if already exists in array
  //             correctPath.push(facitData.path[i]);
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // console.log(correctPath.length);
  // var pathString = arrayToPath(correctPath);
  var result = {
    path: correctPath
  };
  res.send(result);
};
