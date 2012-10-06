#!/usr/bin/env node

var es = require('event-stream'),
    wapojson = require('./transcripts_wapo_510');
    transparency = require('./transparencydata');

wapojson.objects.forEach(function (trans) {
  //console.log(trans.resource_uri);
});

console.log(transparency[0].contributor_name);
transparency.forEach(function (data) {
  console.log(data.amount);
});