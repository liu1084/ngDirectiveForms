'use strict';

angular.module('ngDirectiveForms')
  .controller('mainController', function ($scope, $q, $timeout) {
    $scope.gifts = [
      {product: {type: 'A', minAmount: 10, maxAmount: 50}, giftData: {name: "Gift User A", amount: 25}},
      {product: {type: 'B', minAmount: 25, maxAmount: 500}, giftData: {name: "Gift User B", amount: 50}}
    ];

    $scope.formsValid = false;

    $scope.checkout = function () {
      if ($scope.parentForm.$valid) {
        // Connect with the server
      }
      $scope.formsValid = $scope.parentForm.$valid;
    };

    $scope.registerFormScope = function (form, id) {
      $scope.parentForm['childForm' + id] = form;
    };

    $scope.validateChildForm = function (form, data, product) {
      // Reset the forms so they are no longer valid
      $scope.formsValid = false;
      var deferred = $q.defer();

      $timeout(function () {
        if (angular.isUndefined(data.amount)) {
          return deferred.reject(['amount']);
        }

        if ((data.amount < product.minAmount) || (data.amount > product.maxAmount)) {
          return deferred.reject(['amount']);
        }

        deferred.resolve();
      });

      return deferred.promise;

    }

  });