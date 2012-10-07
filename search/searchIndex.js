var ElasticSearchClient = require('elasticsearchclient'),
        url = require('url');

var apiKey = 'd7629613d1f41332b037a66125bdbbf0';
var connectionString = url.parse('http://api.searchbox.io/api-key/'+apiKey+'/');

var serverOptions = {
   host:connectionString.hostname,
   path:connectionString.pathname
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

  var qryObj = {
    "query":{
      "query_string":{
          "query":"Reliability"
        }
    }
  };

elasticSearchClient.search('wapohack', 'transcripts', qryObj)
    .on('data', function (data) {
      console.log(data)
    }).on('error', function (error) {
      console.log(error)
    })
    .exec()
    //console.log(elasticSearchClient);