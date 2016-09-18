(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', lunchCheckController);

  lunchCheckController.$inject = ['$scope'];

  function lunchCheckController($scope) {

    $scope.input = '';
    $scope.messageColor = '';
    $scope.borderColor = '';

    /* Helper function counting non-empty items
      input: String comma separated value string
      returns: Int number of non-empty items */
    function countItems(input) {
      var count = 0;
      var inputSplit = input.split(',');
      for(var i = 0; i < inputSplit.length; i++) {
        if(inputSplit[i].trim() !== '') {
          count++;
        }
      }
      return count;
    }

    var message = '';

    $scope.checkIfTooMuch = function() {
      $scope.messageColor = 'green-message';
      $scope.borderColor = 'green-border';
      var count = countItems($scope.input);
      if(count == 0) {
        message = 'Please enter data first.';
        $scope.messageColor = 'red-message';
        $scope.borderColor = 'red-border';
      } else if(count < 4) {
        message = 'Enjoy!';
      } else {
        message = 'Too much!';
      }
      $scope.message = message;
    };
  }

})();
