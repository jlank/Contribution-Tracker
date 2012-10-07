'use strict';

/* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
var test_data = [];
var data_date = [];
var dedupe = {};
var sorted_keys = [];
var r2 = [];
var mention_data = [];
//var ran = { romney: false, obama: false };

  if ($routeParams.query) {
		var run = function (candidate) {
     $scope.query = $routeParams.query;
     $http.jsonp('http://jlank.wapohack.jit.su/search?query=Tom%20Vilsack&candidate=obama&callback=JSON_CALLBACK')
        .success(function (data) {	
        	data.forEach(function(item){
				
				var ddy = parseInt(item.key[2]); //date detail year
				var ddm = parseInt(item.key[3]);
				var ddd = parseInt(item.key[4]);
				var dda_int = [ddy,ddm,ddd];
				mention_data.push([Date.UTC(ddy,ddm,ddd),10000]);
			});
			//console.log("first mention" + mention_data);
			      //  console.log(mention_data);
					createChart(candidate, test_data, mention_data);

					//createChart(candidate, mention_data);
					test_data = [];
					data_date = [];
					dedupe = {};
					sorted_keys = [];
					mention_data = [];
					

        });
     $http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate+'&cycle=2012&contributor_ft=' +
          $routeParams.query + '&callback=JSON_CALLBACK')
        .success(function (data) {
					// loop through and put keys into a hash and add up values
					//console.log(data);
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
          	//console.log("key = "+key)
            var dda = key.split('-');
          	var ddy = parseInt(dda[0]); //date detail year
          	var ddm = parseInt(dda[1]);
          	var ddd = parseInt(dda[2]);
          	var dda_int = [ddy,ddm,ddd];
            test_data.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);

          });
				   // console.log(test_data);

				  
				    //console.log(mention_data);
					/*
					createChart(candidate, test_data, mention_data);
					test_data = [];
					data_date = [];
					dedupe = {};
					sorted_keys = [];
					mention_data = [];
					*/
        });
	
	}
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
