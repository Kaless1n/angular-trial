(function() {
  'use strict';

  angular.module('app')
    .component('cardActions', {
      templateUrl: './min/shared/card-actions/index.html',
      controller: CardActionsCtrl,
      bindings: {
        cardId: '<'
      }
    });

  function CardActionsCtrl() {
    var cardActions = this;

    cardActions.cardInvite = cardInvite;
    cardActions.cardReject = cardReject;
    cardActions.cardConsider = cardConsider;

    function cardInvite() {
      console.log('Card #' + cardActions.cardId + ' invite');
    }

    function cardReject() {
      console.log('Card #' + cardActions.cardId + ' reject');
    }

    function cardConsider() {
      console.log('Card #' + cardActions.cardId + ' consider');
    }
  }
})();
