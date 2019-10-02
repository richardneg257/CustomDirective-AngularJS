angular
    .module('app', ['ngMessages'])
    .directive('customValidator', function ($http, $q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                ngModel.$validators.required = function (modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    return (valModel !== "" && valModel != undefined && valModel !== null && valModel != "null");
                }

                ngModel.$validators.pattern = function (modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    return (/[A-Za-z]/).test(valModel);
                }

                ngModel.$validators.patternMinLength = function (modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    return valModel !== undefined && valModel.length > 2;
                }

                ngModel.$validators.patternMaxLength = function (modelValue, viewValue) {
                    var valModel = modelValue || viewValue;
                    return valModel !== undefined && valModel.length < 10;
                }

                ngModel.$asyncValidators.black = function (modelValue, viewValue) {
                    var deferred = $q.defer();
                    $http.get("https://restcountries.eu/rest/v2/region/" + viewValue).then(
                        function (response) {
                            if (response.data.length > 0) {
                                deferred.reject();
                            } else {
                                deferred.resolve();
                            }
                        });

                    return deferred.promise;
                }

            }
        }
    });
