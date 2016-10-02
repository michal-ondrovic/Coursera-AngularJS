(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.searchTerm = "";
  controller.nothingFound = "";
  controller.found = [];

  controller.getFound = function() {
    if(controller.searchTerm !== "") {
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

      promise.then(function(response) {
        controller.found = response;
        controller.nothingFound = "";
        if(controller.found.length === 0) {
          controller.nothingFound = "Nothing found";
        }
      })
      .catch(function(error) {
        console.log('Error!');
      });
    } else {
      controller.found = [];
      controller.nothingFound = "Nothing found";
    }
  };

  controller.removeItem = function(itemIndex) {
    controller.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    })
    .then(function(result) {
      var allItems = result.data.menu_items;
      var foundItems = [];
      for(var i = 0; i < allItems.length; i++) {
        if(allItems[i].description.indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(allItems[i]);
        }
      }
      return foundItems;
    });
    return response;
  };
}

})();
