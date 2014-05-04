/* global angular */
(function () {
    "use strict";

    var bestSellerController = function ($scope, bestSellerFactory) {

        var model = $scope.model = {};
        model.bestSellers = [];
        model.categories = [
            "Hardcover Fiction", 
            "Hardcover Nonfiction"
        ];
        
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
    };

    angular.module("bestSellersApp").controller("bestSellerController", [ "$scope", "bestSellerFactory", bestSellerController ]);
}());