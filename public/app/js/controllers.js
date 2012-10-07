'use strict';

/* Controllers */

var test_data = [];
var data_date = [];
function MyCtrl1($scope, $http, $route, $routeParams, $location) {
//$.getJSON('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=Obama&contributor_ft=Koch&cycle=2010', function(data) {

  if ($routeParams.query) {
     $scope.query = $routeParams.query;
     $http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=Obama&cycle=2012&contributor_ft=' +
          $routeParams.query + '&callback=JSON_CALLBACK')
        .success(function (data) {
          //console.log(data[0].amount);
          //console.log(data);
          data.forEach(function(item){
          	//test_data.push(parseInt(item.amount));	// this is the functional line
          	//test_data.push(parseInt(item.amount)+160); // this is for the cycle 2010 param
          	
          	var amount = (parseInt(item.amount));
          	var dda = item.date.split('-'); // dda = date_detail_array
          	var ddy = parseInt(dda[0]); //date detail year
          	var ddm = parseInt(dda[1]);
          	var ddd = parseInt(dda[2]);
          	var dda_int = [ddy,ddm,ddd];
          	//console.log(ddy,ddm,ddd);
          	if(amount > 0){
          		test_data.push([Date.UTC(ddy,ddm,ddd),amount]);
          	}
          	
          });
		  //console.log(test_data);
        	createChart(test_data, 'Obama');

			
        });
  
     $http.jsonp('http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=Romney&cycle=2012&contributor_ft=' +
          $routeParams.query + '&callback=JSON_CALLBACK')
        .success(function (data) {
          //console.log(data[0].amount);
          //console.log(data);
          data.forEach(function(item){
          	//test_data.push(parseInt(item.amount));	// this is the functional line
          	//test_data.push(parseInt(item.amount)+160); // this is for the cycle 2010 param
          	
          	var amount = (parseInt(item.amount));
          	var dda = item.date.split('-'); // dda = date_detail_array
          	var ddy = parseInt(dda[0]); //date detail year
          	var ddm = parseInt(dda[1]);
          	var ddd = parseInt(dda[2]);
          	var dda_int = [ddy,ddm,ddd];
          	//console.log(ddy,ddm,ddd);
          	if(amount > 0){
          		test_data.push([Date.UTC(ddy,ddm,ddd),amount]);
          	}
          	
          });
		
        	createChart(test_data, 'Romney');
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
