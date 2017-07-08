angular
        .module('Directives', [])
        .directive('starRating', function () {
            return {
                restrict: 'A',
                template: '<ul class="rating">' +
                        '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                        '\u2605' +
                        '</li>' +
                        '</ul>',
                scope: {
                    ratingValue: '=',
                    max: '=',
                    onRatingSelected: '&'
                },
                link: function (scope, elem, attrs) {

                    var updateStars = function () {
                        scope.stars = [];
                        for (var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled: i < scope.ratingValue
                            });
                        }
                    };

                    scope.toggle = function (index) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    };

                    scope.$watch('ratingValue', function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    });
                }
            }
        })
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        })
        .directive('ngConfirmClick', function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure want to delete?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$apply(clickAction);
                        } else {
                        }
                    });
                }
            };
        })
        .directive('ngConfirmClicks', function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure want to Approved?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$apply(clickAction);
                        } else {
                        }
                    });
                }
            };
        })
        .directive('validNumber', function () {
            return {
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    }

                    ngModelCtrl.$parsers.push(function (val) {
                        if (angular.isUndefined(val)) {
                            var val = '';
                        }
                        var clean = val.replace(/[^0-9\-\+\.]/g, '');
                        var decimalCheck = clean.split('.');

                        if (!angular.isUndefined(decimalCheck[1])) {
                            decimalCheck[1] = decimalCheck[1].slice(0, 2);
                            clean = decimalCheck[0] + '.' + decimalCheck[1];
                        }

                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                        }
                        return clean;
                    });

                    element.bind('keypress', function (event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });
                }
            };
        })
        .directive('showMenu', function () {
            return {
                link: function (scope, element, attrs) {
                    $('#nav-accordion').dcAccordion({
                        eventType: 'click',
                        autoClose: true,
                        saveState: true,
                        disableLink: true,
                        speed: 'slow',
                        showCount: false,
                        autoExpand: true,
                        classExpand: 'dcjq-current-parent'
                    });
                    $(".leftside-navigation").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "15px"
                    });

                    $(".leftside-navigation").getNiceScroll().resize();
                    if ($('#sidebar').hasClass('hide-left-bar')) {
                        $(".leftside-navigation").getNiceScroll().hide();
                    }
                    $(".leftside-navigation").getNiceScroll().show();

                    $(".right-stat-bar").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    })
//                    document.getElementById('treeview').onclick = function () {
//                        var a = document.getElementById('treeview').classList;
//                        if (a.length > 1)
//                            a.remove("active");
//                        else
//                            a.add("active");
//                    };

                }
            };

        })

        .directive('fileModel', ['$parse', function ($parse) {

                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {

                        var model = $parse(attrs.fileModel);

                        var modelSetter = model.assign;

                        element.bind('change', function () {

                            scope.$apply(function () {

                                modelSetter(scope, element[0].files[0]);

                            });

                        });

                    }

                };

            }])

        .factory('Excel', function ($window) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                    base64 = function (s) {
                        return $window.btoa(unescape(encodeURIComponent(s)));
                    },
                    format = function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        })
                    };
            return {
                tableToExcel: function (tableId, worksheetName) {
                    var table = $(tableId),
                            ctx = {worksheet: worksheetName, table: table.html()},
                    href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        })


