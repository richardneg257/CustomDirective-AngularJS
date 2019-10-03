angular
    .module('app', ['ngMessages'])
    .directive('customValidator', function ($compile, $http, $q) {
        return {
            restrict: 'A',
            require: ['ngModel', '^form'],
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0];
                var ngForm = ctrls[1];

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

                var nameMessage = ngForm.$name + '.' + attrs.name + '.$error';
                var eMessages = "<div class='g-error' ng-messages='" + nameMessage + "'>";

                eMessages += "<p ng-message='required'>Este campo es requerido</p>";
                eMessages += "<p ng-message='pattern'>Debe escribir sólo letras</p>";
                eMessages += "<p ng-message='patternMinLength'>Debe escribir más de 2 letras</p>";
                eMessages += "<p ng-message='patternMaxLength'>Debe escribir menos de 10 letras</p>";
                eMessages += "<p ng-message='black'>Lista negra</p>";
                eMessages += "</div>"

                var content = $compile(eMessages)(scope);
                element.after(content);
            }
        }
    });
