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
var created = false;
var md = [];
var cd = [];
//var ran = { romney: false, obama: false };

if ($routeParams.query) {
	var run = function (candidate) {
   $scope.query = $routeParams.query;
   var host = 'jlank.wapohack.jit.su';
   //host = 'localhost:3000';
   var mentionUrl = 'http://'+host+'/search2?query='+$routeParams.query+'&candidate='+candidate.toLowerCase()+'&callback=JSON_CALLBACK';
   console.log(mentionUrl);
   $http.jsonp(mentionUrl)
      .success(function (data) {
        if (data.err !== 'undefined') {
          data.forEach(function(item){
            var ddy = parseInt(item.date[0]); //date detail year
            var ddm = parseInt(item.date[1]);
            var ddd = parseInt(item.date[2]);
            //var dda_int = [ddy,ddm,ddd];
            //mention_data.push([Date.UTC(ddy,ddm,ddd),10000]);
            mention_data[candidate.toLowerCase()] = md.push([Date.UTC(ddy,ddm,ddd),10000]);
          });

          charts['candidate'] = candidate;
          charts['mention_data'] = mention_data[candidate.toLowerCase()].md;
          if (!created) {
            console.log('creating mention charts');
            //createChart(charts.candidate, charts.contribution_data, charts.mention_data);
            createChart(charts.candidate, cd, md);
            created = true;
          }
          else {
            console.log('no data for mentions for: ' + $routeParams.query + ' & ' + candidate);
          }
        }

        contribution_data = [];
        data_date = [];
        dedupe = {};
        sorted_keys = [];
        mention_data = [];
      });

   var contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';

   console.log(contribUrl);
   $http.jsonp(contribUrl)
      .success(function (data) {
          // loop through and put keys into a hash and add up values
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
            var ddy = parseInt(dda[0]); //date detail year
            var ddm = parseInt(dda[1]);
            var ddd = parseInt(dda[2]);
            var dda_int = [ddy,ddm,ddd];
            contribution_data[candidate.toLowerCase()] = cd.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);

          });
            charts['candidate'] = candidate;
            charts['contribution_data'] = contribution_data[candidate.toLowerCase()].cd;
           //console.log(cd);
        if (!created) {
          console.log('creating charts');
          //createChart(charts.candidate, charts.contribution_data, charts.mention_data);
          createChart(charts.candidate, cd, md);
          created = true;
        }
				/*
				//createChart(candidate, contribution_data, mention_data);
				contribution_data = [];
				data_date = [];
				dedupe = {};
				sorted_keys = [];
				mention_data = [];
				*/
      });

};

run('Romney');
run('Obama');

}

  $scope.SearchGsa = function() {
    if ($scope.query) {
      window.location.href = '#/search/' + $scope.query;
    }
  }
}
MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
