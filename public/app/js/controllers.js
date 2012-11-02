'use strict';

  /* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
  var contribution_data = {},
      mention_data = {},
      sorted_keys = [],
      created = false,
      data_date = [],
      dedupe = {},
      charts = {},
      r2 = [],
      md = [],
      cd = [];

      var host = 'jlank.wapohack.jit.su';
      //var host = 'localhost:3000';

  $scope.searchBtn = function () {
    if($scope.query) {
      window.location = '#/search/' + $scope.query;
    }
  };

  if ($routeParams.query) {
    var run = function (candidate) {
      charts[candidate] = {};
      $scope.query = $routeParams.query;
      var mentionUrl = 'http://' + host + '/search?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';
      var contribUrl = 'http://' + host + '/transp?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';

      $http.jsonp(mentionUrl)
        .success(function (data) {
          var ddy = '',
              ddm = '',
              ddd = '';

          if (data.err !== 'undefined') {
            data.forEach(function(item){
              ddy = parseInt(item.date[0], 10),
              ddm = parseInt(item.date[1], 10),
              ddd = parseInt(item.date[2], 10);
              md.push([Date.UTC(ddy,ddm,ddd),10000]);
            });

            charts[candidate]['md'] = md
            charts['candidate'] = candidate;
            createChart(charts.candidate, charts[candidate].cd, charts[candidate].md);
          }
        md = [];
        cd = [];
      });


      $http.jsonp(contribUrl)
        .success(function (data) {
          var dda = '',
              ddy = '',
              ddm = '',
              ddd = '',
              dda_int = '';

          // loop through and put keys into a hash and add up values
          data.forEach(function(item) {
            var amount = (parseInt(item.amount)),
                dda = item.date.split('-'); // dda = date_detail_array

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
            dda = key.split('-');
            ddy = parseInt(dda[0], 10); //date detail year
            ddm = parseInt(dda[1], 10);
            ddd = parseInt(dda[2], 10);
            dda_int = [ddy,ddm,ddd];
            cd.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);

          });
          charts[candidate]['cd'] = cd;
          charts['candidate'] = candidate;
          createChart(charts.candidate, charts[candidate].cd, charts[candidate].md);
          md = [];
          cd = [];
        });
        window.chartss = charts;
    };

  run('Romney');
  run('Obama');
  }
}

MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];
