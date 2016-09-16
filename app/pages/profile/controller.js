(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileCtrl', ['$routeParams', 'cardService', ProfileCtrl]);

  function ProfileCtrl($routeParams, cardService) {
    var profile = this;
    profile.data = {
      id: +$routeParams.id
    };

    cardService.getCardById(profile.data.id)
      .success(onRequestSuccess)
      .error(onRequestError);

    window.scrollTo(0, 0);

    function onRequestSuccess(data) {
      profile.data = data;

      var service = cardService.get(data);
      profile.purchase = service.purchase;
    }

    function onRequestError() {
      console.log('Could not get cards data');
    }
  }
})();
