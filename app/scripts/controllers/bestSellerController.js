/* global angular,console */
(function () {
    "use strict";

    var bestSellerController = function ($scope, bestSellerFactory) {

        var model = $scope.model = {};
        model.bestSellers = [];
        model.categories = [];

        model.getCategories = function() {
            return bestSellerFactory.getCategories()
                        .get(function(results) {
                            model.categories = results.results;
                        });
        };

        model.getDetail = function (book, detail) {
            return book.book_details[0][detail];
        };

        model.getDataFor = function (category) {
            if (category === undefined ||
                category === null) return;

            category = category.split(" ").join("-");

            bestSellerFactory.getBestSellers(category)
               .get(function (results) {
                   model.bestSellers = results.results;
               });

        };

        var init = function() {
            model.getCategories().$promise //this is calling model.getCategories() first, before handing over the $promise
                .then(function() {
                    model.selectedCategory = model.categories[0]; // This will update the drop-down when the page loads.
                    model.getDataFor(model.selectedCategory.list_name);
                // },function (reason) {
                //     console.log("Sorry, failed :" + reason);
                });
        };
        init();

    };

    angular.module("bestSellersApp").controller("bestSellerController", [ "$scope", "bestSellerFactory", bestSellerController ]);
}());