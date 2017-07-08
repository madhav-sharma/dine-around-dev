/**
 * Created by Andrey on 05/31/2017.
 */

'use strict';
var restaurant = angular.module('restaurant', []);
modules.push('restaurant');

restaurant.config(function ($stateProvider) {
    $stateProvider
            .state('app.restaurant', {
                url: '/restaurant',
                templateUrl: 'partials/restaurant/restaurant.html',
                controller: 'restaurantCtrl'
            })
            .state('app.restaurant.add', {
                url: '/add',
                templateUrl: 'partials/restaurant/add.html ',
                controller: 'addRestaurantCtrl'
            })
            .state('app.restaurant.edit', {
                url: '/edit/:id',
                templateUrl: 'partials/restaurant/edit.html ',
                controller: 'editRestaurantCtrl',
            })
});

restaurant.controller('restaurantCtrl', function ($scope, Restaurant) {

    $scope.locations = [];

    Restaurant.$loaded().then(function (x) {
        $scope.locations = x;
    })

    $scope.deleteFn = function (restaurant, index) {
        Restaurant.$remove(restaurant).then(function (res) {
            $scope.setFlash('s', 'Deleted Successfull');
        }).catch(function (error) {
            $scope.setFlash('e', error);
        });
    }
});

restaurant.controller('addRestaurantCtrl', function ($scope, $timeout, Restaurant) {

    var ImageStorage = storage.ref();

    $timeout(function () {
        $('.addModal').modal('show');
        $('.addModal').on('hidden.bs.modal', function () {
            $scope.goTo('app.restaurant');
        })
    }, true);

    $scope.add = {};
    $scope.add.city = "Ann Arbor";
    $scope.add.state = "MI";
    $scope.coupon1 = {};
    $scope.coupon2 = {};

    $scope.cuisineArray = [
        'American', 'Mexican', 'Italian', 'Indian'
    ];

    $scope.getImageUrl = function (elementId, image) {
        var pathReference = storage.ref($stateParams.id+"/"+image);
        pathReference.getDownloadURL().then(function (url) {
            console.log(url)
            var img = document.getElementById(elementId);
            img.src = url;
        }).catch(function (error) {
            $scope.setFlash('e', 'Error!' + error);
        });
    }


    $scope.getDataStr = function() {
        var date = new Date();

        var str = date.getUTCFullYear() + ('0' + (date.getUTCMonth() + 1)).slice(-2) + ('0' + date.getUTCDate()).slice(-2) + 
        ('0' + (date.getUTCHours())).slice(-2) + ('0' + date.getUTCMinutes()).slice(-2) + ('0' + date.getUTCSeconds()).slice(-2);

        return str;
    }

    $scope.addFn = function () {

        var prefixStr = $scope.getDataStr();
        console.log(prefixStr);
        if ($scope.logoCtrl) {
            var filename = prefixStr + "_logo.jpg";
            var imagesRef = ImageStorage.child("images/"+filename);

            imagesRef.put($scope.logoCtrl.file).then(function () {
                console.log('Uploaded a blob or file!');
            });

            $scope.add.logo_image = filename;

        }

        if ($scope.pictCtrls) {

            var i = 0;
            var pictures = [];

            for (i = 0; i < $scope.pictCtrls.length; i++) {
                var pics = $scope.pictCtrls[i];

                var filename = prefixStr + "_"+i+"_pic.jpg";
                var imagesRef = ImageStorage.child("images/"+filename);

                pictures.push(filename);

                imagesRef.put(pics.file).then(function () {
                    console.log('Uploaded a blob or file!');
                });
            }

            $scope.add.pictures = pictures;
        }

        if ($scope.menuCtrl) {
            var filename = prefixStr + "_menu.jpg";
            var imagesRef = ImageStorage.child("images/"+filename);

            imagesRef.put($scope.menuCtrl.file).then(function () {
                console.log('Uploaded a blob or file!');
            });
            $scope.add.menu_image = filename;
        }
        
        var coupons = [];
        if ($scope.coupon1.name && $scope.coupon1.code && $scope.coupon1.price) {
            coupons.push({
                "name": $scope.coupon1.name,
                "code": $scope.coupon1.code,
                "price": $scope.coupon1.price
            });
        }
        if ($scope.coupon2.name && $scope.coupon2.code && $scope.coupon2.price) {
            coupons.push({
                "name": $scope.coupon2.name,
                "code": $scope.coupon2.code,
                "price": $scope.coupon2.price
            });
        }
        $scope.add.coupons = coupons;
        $scope.createAt = "06-17"

        // $scope.add.hours = 'Mon\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Tue\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Wed\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Thu\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Fri\t' + moment($scope.hours.starttime2).format('LT') + ' - ' + moment($scope.hours.endtime2).format('LT') + '\n'
        //         + 'Sat\t' + moment($scope.hours.starttime3).format('LT') + ' - ' + moment($scope.hours.endtime3).format('LT') + '\n'
        //         + 'Sun\t' + moment($scope.hours.starttime4).format('LT') + ' - ' + moment($scope.hours.endtime4).format('LT') + '\n';

        Restaurant.$add($scope.add).then(function (res) {

            $scope.setFlash('s', 'Success');
            $('.addModal').modal('hide');
        }).catch(function (error) {
            $scope.setFlash('e', 'Error!' + error);
            $('.addModal').modal('hide');
        });
    }
});

restaurant.controller('editRestaurantCtrl', function ($scope, $timeout, $stateParams, Restaurant) {
    var ImageStorage = storage.ref();
    $timeout(function () {
        $('.editModal').modal('show');
        $('.editModal').on('hidden.bs.modal', function () {
            $scope.goTo('app.restaurant');
        })
    }, true);

    $scope.edit = _.findWhere($scope.locations, {$id: $stateParams.id});
    console.log($scope.edit);
    $scope.upload = {};
//    console.log($scope.edit);
//    if ($scope.edit.logo) {
//        var pathReference = storage.ref($scope.edit.logo);
//        pathReference.getDownloadURL().then(function (url) {
//            $scope.upload.logo = url;
//            $("#logo").src = url;
//            console.log(url);
//        }).catch(function (error) {
//            $scope.setFlash('e', 'Error!' + error);
//        });
//    }

    $scope.getImageUrl = function (elementId, image) {
        var pathReference = storage.ref("images/"+image);
        pathReference.getDownloadURL().then(function (url) {
            console.log(url)
            var img = document.getElementById(elementId);
            img.src = url;
        }).catch(function (error) {
            $scope.setFlash('e', 'Error!' + error);
        });
    }
    if ($scope.edit.logo_image) {
        $scope.getImageUrl('logo', $scope.edit.logo_image);
    }

    if ($scope.edit.menu_image) {
        $scope.getImageUrl('menu1', $scope.edit.menu_image);
    }

    if ($scope.edit.pictures && $scope.edit.pictures.length) {
        _.each($scope.edit.pictures, function (pic, index) {
            $scope.getImageUrl("pic"+index, pic);
        })
    }


    $scope.cuisineArray = [
        'American', 'Mexican', 'Italian', 'Indian',
    ];

   
    if ($scope.edit.coupons[0]) {
        $scope.coupon1 = $scope.edit.coupons[0];
    }
    else {
        $scope.coupon1 = {};
        $scope.coupon1.name = "";
        $scope.coupon1.code = "";
        $scope.coupon1.price = "";
    }
    if ($scope.edit.coupons[1]) {
        $scope.coupon2 = $scope.edit.coupons[1];
    }
    else {
        $scope.coupon2 = {};
        $scope.coupon2.name = "";
        $scope.coupon2.code = "";
        $scope.coupon2.price = "";
    }
    
    $scope.getDataStr = function() {
        var date = new Date();

        var str = date.getUTCFullYear() + ('0' + (date.getUTCMonth() + 1)).slice(-2) + ('0' + date.getUTCDate()).slice(-2) + 
        ('0' + (date.getUTCHours())).slice(-2) + ('0' + date.getUTCMinutes()).slice(-2) + ('0' + date.getUTCSeconds()).slice(-2);

        return str;
    }

    $scope.editFn = function () {


        var prefixStr = $scope.getDataStr();
        console.log(prefixStr);
        if ($scope.logoCtrl) {
            var filename = prefixStr + "_logo.jpg";
            var imagesRef = ImageStorage.child("images/"+filename);

            imagesRef.put($scope.logoCtrl.file).then(function () {
                console.log('Uploaded a blob or file!');
            });

            $scope.edit.logo_image = filename;

        }

        if ($scope.pictCtrls) {

            var i = 0;
            var pictures = [];

            for (i = 0; i < $scope.pictCtrls.length; i++) {
                var pics = $scope.pictCtrls[i];

                var filename = prefixStr + "_"+i+"_pic.jpg";
                var imagesRef = ImageStorage.child("images/"+filename);

                pictures.push(filename);

                imagesRef.put(pics.file).then(function () {
                    console.log('Uploaded a blob or file!');
                });
            }

            $scope.edit.pictures = pictures;
        }

        if ($scope.menuCtrl) {
            var filename = prefixStr + "_menu.jpg";
            var imagesRef = ImageStorage.child("images/"+filename);

            imagesRef.put($scope.menuCtrl.file).then(function () {
                console.log('Uploaded a blob or file!');
            });
            $scope.edit.menu_image = filename;
        }
        
        $scope.edit.coupons = [
            {
                "name": $scope.coupon1.name,
                "code": $scope.coupon1.code,
                "price": $scope.coupon1.price,
            },
            {
                "name": $scope.coupon2.name,
                "code": $scope.coupon2.code,
                "price": $scope.coupon2.price,
            },
        ];

        // $scope.edit.hours = 'Mon\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Tue\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Wed\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Thu\t' + moment($scope.hours.starttime1).format('LT') + ' - ' + moment($scope.hours.endtime1).format('LT') + '\n'
        //         + 'Fri\t' + moment($scope.hours.starttime2).format('LT') + ' - ' + moment($scope.hours.endtime2).format('LT') + '\n'
        //         + 'Sat\t' + moment($scope.hours.starttime3).format('LT') + ' - ' + moment($scope.hours.endtime3).format('LT') + '\n'
        //         + 'Sun\t' + moment($scope.hours.starttime4).format('LT') + ' - ' + moment($scope.hours.endtime4).format('LT') + '\n';

        Restaurant.$save($scope.edit).then(function () {
            $scope.setFlash('s', 'Success');
            $('.editModal').modal('hide');
        }).catch(function (error) {
            $scope.setFlash('e', 'Error!' + error);
            $('.editModal').modal('hide');
        });
    }

});