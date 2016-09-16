(function() {
  'use strict';

  angular.module('app')
    .factory('userService', ['$http', 'config', UserService]);

  function UserService($http, config) {
    var user = {
      isPurchased: isPurchased,
      isFavorite: isFavorite,
      addToPurchased: addToPurchased,
      setFavorite: setFavorite
    };

    user.promise = loadUser()
      .success(onUserDataLoaded)
      .error(onUserDataError);

    function loadUser() {
      return $http.get(config.USER_API);
    }

    function onUserDataLoaded(responce) {
      user.purchased = responce.purchased;
      user.favorite = responce.favorite;
    }

    function onUserDataError(responce) {
      console.log('Could not load purchased and favorite data');
    }

    function isPurchased(id) {
      if (user.purchased) {
        return user.purchased.includes(id);
      }
    }

    function isFavorite(id) {
      if (user.favorite) {
        return user.favorite.includes(id);
      }
    }

    function addToPurchased(id) {
      user.purchased.push(id);
      return $http.patch(config.USER_API, {'purchased': user.purchased});
    }

    function setFavorite(id, enable) {
      if (enable) {
        user.favorite.push(id);
      } else {
        var index = user.favorite.indexOf(id);
        user.favorite.splice(index, 1);
      }

      return $http.patch(config.USER_API, {'favorite': user.favorite});
    }

    return user;
  }
})();
