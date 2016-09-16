(function() {
  'use strict';

  angular.module('app')
    .component('card', {
      templateUrl: './min/pages/card/index.html',
      controller: ['cardService', CardCtrl],
      bindings: {
        data: '<' // one way? then how does 'card.data.isPurchased = true;' works?
      }
    });

  function CardCtrl(cardService) {
    var card = this;
    card.purchase = purchase;

    var service = cardService.get(card.data);

    function purchase() {
      service.purchase();
    }
  }
})();
