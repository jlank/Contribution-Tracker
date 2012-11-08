#!/usr/bin/env node

var es = require('event-stream'),
    request = require('request'),
    url = require('url'),
    conf = require('../config').config;

exports.transparency = function (req, res) {

  var query = req.query.query,
      candidate = req.query.candidate,
      apiKey = conf.transparencyApi,
      results = '',
      resp = [],
      contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey='+ apiKey +
                   '&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' + query;

  request.get({uri: contribUrl }, function (err, r, body) {
    if (err) {
      console.error(err);
    }

    results = body;

    if (results) {
      if (!req.query.callback) {
        res.send(resp);
      }
      else {
        res.send(req.query.callback + '(' + JSON.stringify(results) + ')');
      }
    }
    else {
      res.send(req.query.callback + '(' + JSON.stringify({ "err": "no results"}) + ')');
    }
  });


}

exports.search = function (req, res) {

  var query = req.query.query,
      candidate = req.query.candidate,
      apiKey = conf.searchboxApi,
      results = '',
      resp = [],
      searchQuery = 'http://api.searchbox.io/api-key/' + apiKey +
                    '/wapohack/docs/_search?size=100&q=calas.organizations:' + query +
                    ' OR calais.persons:' + query + ' AND speaker:' + candidate;

  request.get({uri: searchQuery }, function (err, r, body) {
    if (err) {
      console.error(err);
    }

    results = JSON.parse(body);
    resp = [];

    if (results.hits && results.hits.total > 0) {
      results.hits.hits.forEach(function (resu) {
        resp.push({
          speaker: resu._source.speaker,
          calais: resu._source.calais,
          date: resu._source.date
        });
      });

      if (!req.query.callback) {
        res.send(resp);
      }
      else {
        res.send(req.query.callback + '(' + JSON.stringify(resp) + ')');
      }
    }
    else {
      res.send(req.query.callback + '(' + JSON.stringify({ "err": "no results"}) + ')');
    }
  });
};
