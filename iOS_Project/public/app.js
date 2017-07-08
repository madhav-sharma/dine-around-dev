
/**
 * Created by Andrey on 05/29/2017.
 */

var modules = ['ngRoute', 'firebase', 'ui.select', 'ngCookies', 'ui.router', 'Directives',
    'Constants', 'Filters', 'xeditable', 'ui.bootstrap', 'blockUI', 'imageupload',
    'ui.sortable', 'nya.bootstrap.select'];

var admin = angular.module('2016', modules)
        .run(function (editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        })

        .factory('httpInterceptor', function ($q, $rootScope, $window, $log, blockUI) {
            return {
                request: function (config) {
//                    console.log(blockUI);
                    if (blockUI.noOpen) {
                        blockUI.stop();
                    } else {
                        blockUI.noOpen = false;
                    }
                    return config || $q.when(config);

                },
                response: function (response) {
                    if (blockUI.noOpen) {
                        blockUI.stop();
                    } else {
                        blockUI.noOpen = false;
                    }
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    return $q.reject(response);
                }
            };
        })
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider, blockUIConfig) {

            $httpProvider.interceptors.push('httpInterceptor');

            blockUIConfig.message = '';
            //blockUIConfig.autoBlock = false;
            $urlRouterProvider
                    .otherwise('/restaurant');

            $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '',
                        templateUrl: 'partials/app.html',
                    })
                    .state('dummy', {
                        abstract: true,
                        url: '/',
                        templateUrl: 'partials/app.html',
                    });
        })


admin.controller('AppCtrl', function ($scope, $cookieStore, $rootScope, $timeout, $state, $stateParams) {

    $scope.goTo = function (state, params) {

        $timeout(function () {
            if (params) {
                $state.transitionTo(state, angular.extend($stateParams, params));
            } else {
                $state.transitionTo(state, $stateParams);
            }
        }, 600);
    };

    $rootScope.goToFn = function (state, params) {
        $scope.goTo(state, params)
    }


    $scope.setFlash = function (mtype, msg, time) {

        var type;
        switch (mtype) {

            case 's':
                type = 'success';
                break;
            case 'e':
                type = 'error';
                break;
            case 'w':
                type = 'warning';
                break;
            case 'n':
                type = 'notice';
                break;
        }

        var notification = new NotificationFx({
            message: '<i class="glyphicon"></i><p>' + msg + '</p>',
            layout: 'attached',
            effect: 'bouncyflip',
            type: type,
            ttl: time || 10000
        });
        notification.show();
    }

    $scope.dateformat = 'DD-MM-YYYY';

    $rootScope.me = {
        name: $cookieStore.get('name')
    }

    $rootScope.isNotLogin = false;
});

admin.factory('Restaurant', function ($firebaseArray) {
    var ref = new firebase.database().ref('locations');
    return $firebaseArray(ref);
});

 

//admin.factory('ImageStorage', function () {
//
//    // Get a reference to the storage service, which is used to create references in your storage bucket
//    var storage = firebase.storage();
//
//    // Create a storage reference from our storage service
//    var storageRef = storage.ref();
//
//    return storageRef;
//
//});

