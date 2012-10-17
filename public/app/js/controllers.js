'use strict';

  /* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
  var data_date = [];
  var dedupe = {};
  var sorted_keys = [];
  var r2 = [];
  var mention_data = {};
  var contribution_data = {};
  var charts = {};
  //var created = false;
  var md = [];
  var cd = [];
  var maxamount = 0;

  $scope.searchBtn = function () {
    if($scope.query) {
      window.location = '#/search/' + $scope.query;
    }
  }

//when someone searches...
  if ($routeParams.query) {
    var run = function (candidate) {
     charts[candidate] = {};
     $scope.query = $routeParams.query;
     var host = 'jlank.wapohack.jit.su';

     var mentionUrl = 'http://'+host+'/search2?query='+$routeParams.query+'&candidate='+candidate.toLowerCase()+'&callback=JSON_CALLBACK';
     //console.log(mentionUrl);
     $http.jsonp(mentionUrl)
        .success(function (data) {
          if (data.err !== 'undefined') {
            data.forEach(function(item){
              var ddy = parseInt(item.date[0], 10); //date detail year
              var ddm = parseInt(item.date[1], 10);
              var ddd = parseInt(item.date[2], 10);
              md.push([Date.UTC(ddy,ddm,ddd),10000]);

            });

            charts[candidate]['md'] = md
            charts['candidate'] = candidate;
            //console.log('creating mention charts');
            createChart(charts.candidate, charts[candidate].cd, charts[candidate].md);
          }
            md = [];
            cd = [];
        });

      //need to get API keys out of here
     var contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';

     //call transparency data for info
     $http.jsonp(contribUrl)
        .success(function (data) {
            //on successfull request loop through and put keys into a hash and add up values
            data.forEach(function(item){
              var amount = (parseInt(item.amount));
              var dda = item.date.split('-'); // dda = date_detail_array
              
              if (!dedupe[item.date]) {
                dedupe[item.date] = 0;
              }
              dedupe[item.date] += amount;
            });

            for (var contribution in dedupe) {
              sorted_keys.push(contribution);
            }

            sorted_keys = sorted_keys.sort();

            sorted_keys.forEach(function (key) {
              var dda = key.split('-');
              var ddy = parseInt(dda[0], 10); //date detail year, note the '10' param in parseInt for cross browser compatability
              var ddm = parseInt(dda[1], 10);
              var ddd = parseInt(dda[2], 10);
              var dda_int = [ddy,ddm,ddd];
              if (dedupe[key]>0){
                cd.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);
              }

              //find the max amount
              if (dedupe[key]>maxamount){
                maxamount = dedupe[key]
              }

            });
            console.log(maxamount)

            charts[candidate]['cd'] = cd;
            charts['candidate'] = candidate;
            createChart(charts.candidate, charts[candidate].cd, charts[candidate].md, maxamount);
            md = [];
            cd = [];
            //return cd

        });
     window.chartss = charts;

  };

  run('Romney');
  //console.log(run('Romney'))
  run('Obama');
  //createChart(charts.Romney , charts[Romney].cd, charts[Romney].md, maxamount);

}

}

MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];
