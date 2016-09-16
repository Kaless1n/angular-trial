(function() {
  'use strict';

  angular.module('app')
    .factory('cardService', ['$http', 'config', 'userService', CardService]);

  function CardService($http, config, userService) {
    var service = {
      get: get,
      getCardById: getCardById
    };

    function Card(data) {
      this.data = data;

      // initial card params check
      if(userService.isPurchased(data.id)) {
        attachContactsData(data)
          .then(enablePurchasedFlag)
          .catch(function() {
            console.log('Card #' + data.id +
                ' is purchased but contacts are not available');
            });
      }
    }

    Card.prototype.purchase = function() {
      attachContactsData(this.data)
        .then(addToPurchased)
        .then(enablePurchasedFlag)
        .catch(function(data) {
          console.log('Could not purchase card #' + data.id);
        });
    };

    function attachContactsData(data) {
      return $http.get(config.CONTACTS_API + data.id)
        .then(function(responce) {
          angular.extend(data, responce.data);
          return data;
        });
    }

    function addToPurchased(data) {
      return userService.addToPurchased(data.id)
        .then(function() {
          return data;
        })
        .catch(function() {
          console.log('Could not save card #' + data.id + ' as purchased');
        });
    }

    function enablePurchasedFlag(data) {
      data.isPurchased = true;
      return data;
    }

    function get(data) {
      return new Card(data);
    }

    function getCardById(id) {
      return $http.get(config.CARDS_LIST_API + id);
    }

    return service;
  }
})();
