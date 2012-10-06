#!/usr/bin/env node

var es = require('event-stream'),
    koch = require('../koch');

exports.amount = function (req, res) {
  var amount = [];
  koch.forEach(function (data) {
    amount.push(data.amount);
  });
  res.send(amount);
  console.log(amount);
};