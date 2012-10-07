#!/usr/bin/env node

var es = require('event-stream');
var request = require('request');

exports.search = function (req, res) {
  var results = [];
  var callback = req.query.callback;
  var query = req.query.query;
  var candidate = req.query.candidate.toLowerCase();

  if (req.query.query && req.query.candidate) {
  request.get('https://jlank.iriscouch.com/wapohack/_design/lists/_view/by_speaker_person_date?startkey=[%22'+candidate+'%22,%22'+req.query.query+'%22,{}]&endkey=[%22'+candidate+'%22,%22'+req.query.query+'%22]&descending=true',
  function (err, r, body) {
    if (err) {
      console.log(err);
    }
    else {
      var obj = JSON.parse(body);
      obj.rows.forEach(function (data) {
        results.push(data);
      });

      if (!req.query.callback) {
        res.send(results);
      }
      else {
        res.send(callback + '(' + JSON.stringify(results) + ')');
      }
    }
  });
  }
};