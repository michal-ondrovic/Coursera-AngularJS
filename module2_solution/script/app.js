(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.list = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  }
}

AlreadyBoughtShoppingController.inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;

  bought.list = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  service.toBuyItems = [
    {name: 'pencils', quantity: 2},
    {name: 'scissors', quantity: 1},
    {name: 'notebooks', quantity: 2},
    {name: 'mugs', quantity: 3},
    {name: 'cookies', quantity: 5}
  ];
  service.boughtItems = [];

  service.getToBuyItems = function() {
    return service.toBuyItems;
  };

  service.getBoughtItems = function() {
    return service.boughtItems;
  };

  service.buy = function(itemIndex) {
    service.boughtItems.push(service.toBuyItems.splice(itemIndex, 1)[0]);
  };

}

})();
