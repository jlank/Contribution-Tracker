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
  var md = [];
  var cd = [];
  var maxd = [];
  var maxamount = 0;
  var maxcounter = 0
  
  //get max takes in the search term, finds the maximum contribution to either candidate and plugs it in
  function getMax(){
    if($routeParams.query){
      var host = 'jlank.wapohack.jit.su';
      var o_contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=obama&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';
      var r_contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft=romney&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';
      var o_search = getContributions(o_contribUrl);
      var r_search = getContributions(r_contribUrl);
    }
    else{
      console.log('No search results')
    }
  };

  function getContributions(contribUrl){
    $http.jsonp(contribUrl).success(function (data) {
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
        

        //find the max amount
        if (dedupe[key]>maxamount){
          console.log(dedupe[key])
          maxamount = dedupe[key]
        }
      });

      maxcounter = maxcounter + 1
      if (maxcounter === 2){
        console.log('About to draw charts')
        //console.log(maxamount)

         run('Romney');
         run('Obama');
      }
    });
  } 

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
            createChart(charts.candidate, charts[candidate].cd, charts[candidate].md);
          }
            md = [];
            cd = [];
        });

      //need to get API keys out of here
     var contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate.toLowerCase()+'&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';

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
            });
            charts[candidate]['cd'] = cd;
            charts['candidate'] = candidate;
            createChart(charts.candidate, charts[candidate].cd, charts[candidate].md, maxamount);
            md = [];
            cd = [];
            //return cd

        });
     window.chartss = charts;

  };
  getMax();
 
}

}

MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];
