/* global console, require, __dirname */

(function() {
    "use strict";

    var express = require("express"),
        app = express(),
        request = require("request"),
        api_key = "3f943f09bc4c6bb61d6209d7beea718c%3A5%3A69163357";

    app.use(express.static(__dirname, "/"));

    app.get("/getCategories", function(req, res) {
        var categories = {};

        console.log("Getting available bestseller categories from NY Times...");
        request({
            uri: "http://api.nytimes.com/svc/books/v2/lists/names/?api-key=" + api_key,
            method: "GET"
        }, function (error, response, body) {
            categories = body;
            res.send(categories);
        });
    });

    app.get("/getBestSellers/:category", function(req, res) {
        var bestSellers = {};

        console.log("Getting best-sellers for category: " + req.params.category);
        request({
            uri: "http://api.nytimes.com/svc/books/v2/lists/" + req.params.category + "?api-key=" + api_key,
            method: "GET"
        }, function (error, response, body) {
            bestSellers = body;
            res.send(bestSellers);
        });
    });

    app.listen(8080);

    console.log("Express listening on port 8080");
}());