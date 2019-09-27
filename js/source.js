angular
    .module('app', ['ngMessages'])
    .directive('customValidator', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                ngModel.$validators.required = function requiredParser(modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    if (valModel !== "" && valModel != undefined && valModel !== null && valModel != "null")
                        return true;
                    else
                        return false;
                }

                ngModel.$validators.pattern = function patternParser(modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    return (/[0-9]/).test(valModel);
                }

            }
        }
    });
