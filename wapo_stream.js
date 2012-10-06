#!/usr/bin/env node

var es = require('event-stream'),
    wapojson = require('./transcripts_wapo_510');
    transparency = require('./transparencydata');
    koch = require('./koch');

wapojson.objects.forEach(function (trans) {
  //console.log(trans.resource_uri);
});

//console.log(transparency[0].contributor_name);
var date = [];
var amount = [];
koch.forEach(function (data) {
  date.push(data.date);
  amount.push(data.amount);
});

console.log(date);
console.log(amount);