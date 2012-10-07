'use strict';

/* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
var test_data = [];
var data_date = [];
var dedupe = {};
var sorted_keys = [];

  if ($routeParams.query) {
     $scope.query = $routeParams.query;
     $http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=Obama&cycle=2010|2012&contributor_ft=' +
          $routeParams.query + '&callback=JSON_CALLBACK')
        .success(function (data) {
          //console.log(data[0].amount);
          //console.log(data);
          data.forEach(function(item){
          	//test_data.push(parseInt(item.amount));	// this is the functional line
          	//test_data.push(parseInt(item.amount)+160); // this is for the cycle 2010 param

          	var amount = (parseInt(item.amount));
          	var dda = item.date.split('-'); // dda = date_detail_array
            if (!dedupe[item.date]) {
              dedupe[item.date] = 0;
            }
            dedupe[item.date] += amount;
            /*
          	var ddy = parseInt(dda[0]); //date detail year
          	var ddm = parseInt(dda[1]);
          	var ddd = parseInt(dda[2]);
          	var dda_int = [ddy,ddm,ddd];
            */
          //console.log(ddy,ddm,ddd);
          	if(amount > 0){
          		//test_data.push([Date.UTC(ddy,ddm,ddd),amount]);
          	}
          	//data_date.push(dda_int);
          	//[[[2012,02,02],1000],[[2012,02,03],2000]]
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
          window.dedupe = dedupe;
          window.sorted_keys = sorted_keys;
		  //console.log(dedupe);
          //$scope.results = data;
          //$scope.data = [];
         // $scope.data[0] = data[0].amount;
         // $scope.data[1] = data[1].amount;
          //console.log($scope.data);
        	createChart(test_data);

        });
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
