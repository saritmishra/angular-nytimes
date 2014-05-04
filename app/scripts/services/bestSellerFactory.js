/* global  angular */

(function () {
    "use strict";

    var bestSellerFactory = function($resource) {
        var factory = {};

        factory.getBestSellers = function(category){
            return $resource("/getBestSellers/" + category);
        };

        factory.getCategories = function(){
            return $resource("/getCategories");
        };

        return factory;
    };

    angular.module("bestSellersApp").factory("bestSellerFactory", ["$resource", bestSellerFactory]);
}());