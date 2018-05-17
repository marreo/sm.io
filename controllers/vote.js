var Vote = require('../models/Vote');
const moment = require('moment');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./drumpfVote');

exports.get = (req, res) => {
  Vote.find({}, function (err, votes) {
    var data = [];
    Vote.count({
      q: 1
    }, function (e, v) {
      data.push(v);
      Vote.count({
        q: 2
      }, function (e, v) {
        data.push(v);
        Vote.count({
          q: 3
        }, function (e, v) {
          data.push(v);
          Vote.count({
            q: 4
          }, function (e, v) {
            data.push(v);
            Vote.count({
              q: 5
            }, function (e, v) {
              data.push(v);
              Vote.count({
                q: 6
              }, function (e, v) {
                data.push(v);
                Vote.count({
                  q: 7
                }, function (e, v) {
                  data.push(v);
                  Vote.count({
                    q: 8
                  }, function (e, v) {
                    data.push(v);
                    Vote.count({
                      q: 9
                    }, function (e, v) {
                      data.push(v);
                      Vote.count({
                        q: 10
                      }, function (e, v) {
                        data.push(v);
                        Vote.count({
                          q: 11
                        }, function (e, v) {
                          data.push(v);
                          Vote.count({
                            q: 12
                          }, function (e, v) {
                            data.push(v);
                            Vote.count({
                              q: 13
                            }, function (e, v) {
                              data.push(v);
                              Vote.count({
                                q: 14
                              }, function (e, v) {
                                data.push(v);
                                Vote.count({
                                  q: 15
                                }, function (e, v) {
                                  data.push(v);
                                  res.json(data);
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

exports.post = (req, res, data, vueOptions) => {
  if (localStorage.getItem('voted')) {
    res.sendStatus(500);
  } else {
    localStorage.setItem('voted', 'y')
    Vote.create({
      d: new Date(),
      q: req.body.q
    }, function (err, _vote) {
      if (err) res.send(500);
      res.end();
    });
  }
};