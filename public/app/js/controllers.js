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
    var run = function (candidate) {
      charts[candidate] = {};
      $scope.query = $routeParams.query;
      var mentionUrl = 'http://' + host + '/search2?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';
      var contribUrl = 'http://transparencydata.com/api/1.0/contributions.json?apikey=f266a32377604e7d91bbbafd76abb4cc&recipient_ft='+candidate.toLowerCase() +'&cycle=2012&contributor_ft=' + $routeParams.query + '&callback=JSON_CALLBACK';
      //var contribUrl = 'http://' + host + '/transp?query=' + $routeParams.query + '&candidate=' + candidate.toLowerCase() + '&callback=JSON_CALLBACK';

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
              var utcsecs = final_i/1000;
              var utcdays = Math.floor(final_i/(1000*60*60*24*30));
              var utcmins = utcsecs/60;
              //var debugvar = dedupementions[utcdays];
              if (!dedupementions[utcdays]) {
              dedupementions[utcdays] = mentionsamount;
              } 
              dedupementions[utcdays] += mentionsamount;
              
              //console.log(utcdays);
              //console.log(dedupementions[utcdays]);
              //md.push([final_i,10000]);
            }); // end of iteration through data

            for (var mention in dedupementions) {
              console.log(dedupementions[mention]);
              md.push([(mention*1000*60*60*24*30), (dedupementions[mention]*3000)]);
              sorted_mention_keys.push(mention);
            }

            // sorted_mention_keys.forEach(function (key) {
            //   md.push([final_i,10000]);
            // }


            charts[candidate]['md'] = md;
            charts['candidate'] = candidate;
            //createChart(charts.candidate, charts[candidate].cd, charts[candidate].md);
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
        console.log(charts);
        console.log(charts[candidate]['cd']);
        

        //console.log(charts.candidate.cd);
        //createChart(charts.candidate, charts.candidate.cd, charts.candidate.md);
        //setTimeout(function(){alert("Hello")},3000);

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
        console.log(maxamount);
        createChart('Romney', charts.Romney.cd, charts.Romney.md, maxamount);
        createChart('Obama', charts.Obama.cd, charts.Obama.md, maxamount);
      }
      else{alert('data error.  Try reloading page')}
    }
  );
  run('Romney');
  run('Obama');
  }
}
MyCtrl1.$inject = ['$scope', '$http', '$route', '$routeParams', '$location'];
