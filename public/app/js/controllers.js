'use strict';

/* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
var test_data = [];
var data_date = [];
var dedupe = {};
var sorted_keys = [];
var r2 = [];

  if ($routeParams.query) {
		var run = function (candidate) {
     $scope.query = $routeParams.query;
     $http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' +
          $routeParams.query + '&callback=JSON_CALLBACK')
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
            //console.log(contribution + ': ' + dedupe[contribution]);
            sorted_keys.push(contribution);
          }
          sorted_keys = sorted_keys.sort();
          sorted_keys.forEach(function (key) {
            var dda = key.split('-');
          	var ddy = parseInt(dda[0]); //date detail year
          	var ddm = parseInt(dda[1]);
          	var ddd = parseInt(dda[2]);
          	var dda_int = [ddy,ddm,ddd];
            test_data.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);

          });

        	createChart(test_data, candidate);
        });
		}
		//https://jlank.iriscouch.com/wapohack/_design/lists/_view/by_speaker_person_date?startkey=[%22obama%22,%22Tom%20Vilsack%22,{}]&endkey=[%22obama%22,%22Tom%20Vilsack%22]&descending=true
		//https://jlank.iriscouch.com/wapotranscript/_design/lists/_view/by_speaker_person_date?startkey=[%22obama%22,{}]&endkey=[%22obama%22]&descending=true
     //$http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' +
       //   $routeParams.query + '&callback=JSON_CALLBACK')
     $http.jsonp('https://jlank.iriscouch.com/wapohack/_design/lists/_view/by_speaker_person_date?startkey=[%22obama%22,%22Tom%20Vilsack%22,{}]&endkey=[%22obama%22,%22Tom%20Vilsack%22]&descending=true&callback=JSON_CALLBACK')
        .success(function (data) {	
        	
        	//console.log('inside 2nd call');
		});
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
