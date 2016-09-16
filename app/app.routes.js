(function() {
  'use strict';

  angular.module('app')
    .config(function($routeProvider, $locationProvider){
      $locationProvider.html5Mode(true);

      var originalWhen = $routeProvider.when;

      $routeProvider.when = function(path, route) {
        route.resolve = route.resolve || {};
        angular.extend(route.resolve, {
          'userData': 'resolveService'
        });

        return originalWhen.call($routeProvider, path, route);
      };

      $routeProvider
        .when('/', {
          controller: 'CardsListCtrl',
          controllerAs: 'cards',
          templateUrl: './min/pages/cards-list/index.html'
        })
        .when('/profile/:id', {
          controller: 'ProfileCtrl',
          controllerAs: 'profile',
          templateUrl: './min/pages/profile/index.html'
        })
        .otherwise({
          template: '<h1>404</h1>'
        });
    })
    .factory('resolveService', ['userService', resolveService]);

    function resolveService(userService) {
      return userService.promise;
    }
})();
