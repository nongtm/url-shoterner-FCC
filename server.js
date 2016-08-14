var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    console.log('Connection established to', url);
  }
  
  var collection = db.collection('url');
  
  app.get(/^\/new\/(https?\:\/\/www(\.\w\w+)*)/, function(req, res) {
    var param = req.params[0];
    var rand = Math.floor((Math.random()*9000) + 1) + 1000;
    
    collection.insert({
      long: param,
      short: rand
    });
    
    var obj = {
      "original_url": param,
      "short_url": "https://afternoon-lowlands-74617.herokuapp.com/" + rand
    };
    res.send(obj);
  });
  
  app.get('/:short', function(req,res){
    var param = req.params.short;
    collection.find({
      short: +param
    }).toArray(function(err, document){
      if (err) return err;
      res.redirect(document[document.length-1].long);
    });
  });
  
  app.get('/new', function(req,res){
    res.send("Wrong url format!");
  });
  
  app.get('*',function(req,res){
    res.send("This url is not on the database!");
  });

  app.listen(process.env.PORT || 8080, function() {
    console.log('Example app listening on port 8080!');
  });

});
