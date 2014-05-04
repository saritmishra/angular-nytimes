var express = require('express'),
    app = express(),
    request = require('request');                      

app.use(express.static(__dirname, '/'));

app.get('/getBestSellers/:category', function(req, res) {    
    var bestSellers = {};
    
    console.log("Connecting to NY Times BestSellers API");
    request({
        uri: "http://api.nytimes.com/svc/books/v2/lists/" + req.params.category + "?api-key=3f943f09bc4c6bb61d6209d7beea718c%3A5%3A69163357",            
        method: "GET"
    }, function (error, response, body) {
        bestSellers = body;
        res.send(bestSellers);
    });
    
});

app.listen(8080);

console.log('Express listening on port 8080');