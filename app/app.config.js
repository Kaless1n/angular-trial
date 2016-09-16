(function() {
  'use strict';

  angular.module('app')
    .constant('config', {
      CARDS_LIST_API: 'http://localhost:3000/cards/',
      CONTACTS_API: 'http://localhost:3000/contacts/',
      USER_API: 'http://localhost:3000/user/'
    });
})();
