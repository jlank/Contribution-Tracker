var ElasticSearchClient = require('elasticsearchclient'),
  request = require('request'),
  url = require('url');

var apiKey = 'd7629613d1f41332b037a66125bdbbf0';

  var qryObj = {
    "query":{
      "term": { "speaker":"romney" }
      //"facets" : { "tags" : { "terms" : {"organizations" : "Koch", "persons": "Koch"} } }
    }
  };

// search index
/*
  request.get({uri: 'http://api.searchbox.io/api-key/'+apiKey+
    '/wapohack/docs/_search?q=speaker:obama'}, function (err, r, b) {
*/
  request.get({uri: 'http://api.searchbox.io/api-key/'+apiKey+
    '/wapohack/docs/_search', qs: qryObj}, function (err, r, b) {
  if (err) {
    console.log(err);
  }

  //console.log(JSON.parse(JSON.stringify(b,null,2)));
  var o = JSON.parse(b);
  //console.log(JSON.stringify(o.hits.hits[0]._source,null,4));
  console.log(o.hits.hits[0]._source.speaker);
  console.log(o.hits.hits[0]._source.date);
  console.log(JSON.stringify(o.hits.hits[0]._source.calais, null, 4));


});







