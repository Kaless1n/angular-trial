(function() {
  'use strict';

  angular.module('app')
    .controller('CardsListCtrl', ['cardsListService', CardsListCtrl]);

  function CardsListCtrl(cardsListService) {
    var cards = this;

    cardsListService.getList()
      .success(onRequestSuccess)
      .error(onRequestError);

    function onRequestSuccess(data) {
      cards.list = data;
    }

    function onRequestError() {
      console.log('Could not get cards data');
    }
  }
})();
