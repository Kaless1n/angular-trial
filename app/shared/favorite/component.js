(function() {
  'use strict';

  angular.module('app')
    .component('favorite', {
      templateUrl: './min/shared/favorite/index.html',
      controller: ['userService', FavoriteCtrl],
      bindings: {
        cardId: '<'
      }
    });

  function FavoriteCtrl(userService) {
    var favorite = this;
    favorite.toggle = toggle;
    favorite.isFavorite = userService.isFavorite(favorite.cardId);

    function toggle() {
      userService.setFavorite(favorite.cardId, !favorite.isFavorite)
        .success(onSetFavSuccess)
        .error(onSetFavError);
    }

    function onSetFavSuccess() {
      favorite.isFavorite = !favorite.isFavorite;
    }

    function onSetFavError(data) {
      console.log('Could not set card fav');
    }
  }
})();
