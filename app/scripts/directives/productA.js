'use strict';

angular.module('ngDirectiveForms')
  .directive('productA', function ($timeout) {
    return {
      templateUrl: '../app/views/productA.html',
      restrict: 'A',
      scope: {
        registerFormScope: '=',
        giftData: '=',
        validateChildForm: '=',
        product: '='
      },
      link: function postLink(scope) {
        scope.disabled = true;

        scope.saveForm = function () {
          scope.validateChildForm(scope.form, scope.giftData, scope.product).then(function () {
            angular.forEach(scope.form.fields, function (val) {
              scope.form.$setValidity(val, true);
              scope.form[val].$error.server = false;
            });
            scope.disabled = true;
          }, function (invalidFields) {
            angular.forEach(invalidFields, function (val) {
              if (angular.isDefined(scope.form[val])) {
                scope.form[val].$error.server = true;
                scope.form.$setValidity(val, false);
              }
            });
            scope.disabled = false;
          });
        };

        // Add the form to the controller through the registerFormScope
        $timeout(function () {
          scope.form.fields = ['name', 'amount'];
          scope.registerFormScope(scope.form, scope.$id);
        });

      }
    };
  });