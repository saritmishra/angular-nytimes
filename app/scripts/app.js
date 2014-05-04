/* global angular */

(function () {

"use strict";

angular
    .module("bestSellersApp", [
        "ngResource",
        "ngRoute",
        "ui.bootstrap"
    ])
    .config( function ( $routeProvider ) {

        $routeProvider
            .when("/", {
                templateUrl: "views/main.html",
                controller: "bestSellerController"
            })
            .otherwise({
                redirectTo: "/"
            });
    });

}());
