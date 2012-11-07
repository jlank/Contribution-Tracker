'use strict';

/* Controllers */

function MyCtrl1($scope, $http, $route, $routeParams, $location) {
  var contribution_data = {},
      mention_data = {},
      sorted_keys = [],
      sorted_mention_keys = [],
      created = false,
      data_date = [],
      dedupe = {},
      dedupementions = {},
      charts = {},
      r2 = [],
      md = [],
      cd = [],
      maxamount = 0,
      dataloader = 0,
      count = 0;

  var host = 'jlank.wapohack.jit.su';
  $scope.searchBtn = function () {
    if($scope.query) {
      window.location = '#/search/' + $scope.query;
    }
  };

  //when someone searches...
  if ($routeParams.query) {
    var getData = function (candidate) {
      charts[candidate] = {};
      $scope.query = $routeParams.query;
      var mentionUrl = 'http://' + host + '/search?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';
      var contribUrl = 'http://' + host + '/transp?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';

      $http.jsonp(mentionUrl)
        .success(function (data) {
          var ddy = '',
              ddm = '',
              ddd = '',
              final_i;

          if (data.err !== 'undefined') {
            var mentionsamount = 1;
            data.forEach(function(item){

              //break into components
              ddy = parseInt(item.date[0], 10), // ddy = date detail year
              ddm = parseInt(item.date[1], 10),
              ddd = parseInt(item.date[2], 10);
              final_i = Date.UTC(ddy,ddm,ddd);
              var utcdays = Math.floor(final_i/(1000*60*60*24*30));
              if (!dedupementions[utcdays]) {
              dedupementions[utcdays] = mentionsamount;
              }
              dedupementions[utcdays] += mentionsamount;
            }); // end of iteration through data

            for (var mention in dedupementions) {
              md.push([(mention*1000*60*60*24*30), (dedupementions[mention])]);
              sorted_mention_keys.push(mention);
            }

            charts[candidate]['md'] = md;
            charts['candidate'] = candidate;
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
            //find the max amount
            if (dedupe[key]>maxamount){
              maxamount = dedupe[key]
            }

            cd.push([Date.UTC(ddy,ddm,ddd),dedupe[key]]);

          });
          charts[candidate]['cd'] = cd;
          md = [];
          cd = [];
        });
        window.chartss = charts;
    };

  async.whilst(
    function () { return count < 1; },
    function (callback) {
        count++;
        setTimeout(callback, 1000);
        //callback();
    },
    function (err) {
      if (charts.Obama.cd !== undefined){
        createChart('Romney', charts.Romney.cd, charts.Romney.md, maxamount);
        createChart('Obama', charts.Obama.cd, charts.Obama.md, maxamount);
      }
      else{alert('data error.  Try reloading page or send an email to nathanmaton@gmail.com')}
    }
  );
  getData('Romney');
  getData('Obama');
  }
}
MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];
