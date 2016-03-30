var app = angular.module('app', ['firingService']);

app.config(function ($locationProvider, $routeProvider){

  $routeProvider.when("/", {templateUrl: "index.html"});

  $routeProvider.when("/:firingnumber", {
    templateUrl: "firing.html",
    controller: function($scope, $routeParams, firings) {

      $scope.firingNumber = $routeParams.firingnumber;
      $scope.firings = firings;
    },
    resolve: {
      firings: function($q, $route, $timeout){
        var deferred = $q.defer();
        var firingNum = $route.current.params.FiringNumber;
        var successPromise = function(result){
          if(angular.equals(result, [])){
            deferred.reject("No Firing Found");

          }
          else{
            deferred.resolve(result);
          }
        };
        //Timeout
      $timeout(function(){
        return [{id: 1, firingName: 'FIRING ONE'},
      {id: 2, firingName: 'Firing Two'}], successPromise
      }, 2000);
      return deferred.promise;
    }
  }
});
});
