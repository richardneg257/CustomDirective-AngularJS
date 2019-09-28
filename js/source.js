angular
    .module('app', ['ngMessages'])
    .directive('customValidator', function ($http, $q) {
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
                    return (/[A-Za-z]/).test(valModel);
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
