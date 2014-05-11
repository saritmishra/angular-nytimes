/* global  angular, console */

(function () {
    "use strict";

    var bestSellerFactory = function($resource) {
        var factory = {};

        factory.getBestSellers = function fn(category){
            if (!fn.cache)
                fn.cache = {};
            if (!fn.cache[category])
                fn.cache[category] = {};

            // var deferred = $q.defer();

            // if this category was never fetched before or if the data is stale...
            if (!fn.cache[category].lastUpdated || (new Date() - fn.cache[category].lastUpdated.getDate() > 1)) {
                console.log("fetching from backend...");
                fn.cache[category].lastUpdated = new Date();

                $resource("/getBestSellers/" + category)
                .get(function (results){
                    fn.cache[category].results = results.results;
                    return  fn.cache[category].results;
                });
            } else {
                console.log("using cached copy");
                console.log("last updated:" + fn.cache[category].lastUpdated);
                console.log("time now: " + new Date());
                return fn.cache[category].results;
            }
             // bestSellerFactory.getBestSellers(category)
             //   .get(function (results) {
             //       model.bestSellers = results.results;
             //   });

        };

        factory.getCategories = function(){
            return $resource("/getCategories");
        };

        // var refreshData = function() {
        //     var today = new Date();
        //     var isStale = (today.getDate() - this.lastFetched.getDate() > 1);

        //     if (!this.lastFetched ||  isStale) {
        //         this.lastFetched = new Date();
        //       }
        // };

        return factory;
    };

    angular.module("bestSellersApp").factory("bestSellerFactory", ["$resource", bestSellerFactory]);
}());