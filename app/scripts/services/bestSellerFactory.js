/* global  angular */

(function () {
    "use strict";

    var bestSellerFactory = function($resource) {
        var factory = {};

        factory.getBestSellers = function(category){
            return $resource("/getBestSellers/" + category);
        };

        return factory;
    };

    angular.module("bestSellersApp").factory("bestSellerFactory", ["$resource", bestSellerFactory]);
}());