#!/usr/bin/env node

var es = require('event-stream'),
    wapojson = require('./transcripts_wapo_510');

wapojson.objects.forEach(function (trans) {
  console.log(trans.resource_uri);
});