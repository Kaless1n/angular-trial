(function() {
  'use strict';

  angular.module('app')
    .factory('cardsListService', ['$http', 'config', CardsListService]);

  function CardsListService($http, config) {
    var service = {
      getList: getList
    };

    function getList() {
      return $http.get(config.CARDS_LIST_API);
    }

    return service;
  }
})();
