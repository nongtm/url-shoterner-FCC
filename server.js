var express = require('express');
var app = express();

var date = "";
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


app.get('/:date', function (req, res) {
  var unix = null;
  var nat = null;
    var param = req.params.date;
    if(+param >=0){
      unix = +param; 
      date = new Date(+param *1000);
      nat = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    
    else if(isNaN(+param) && new Date(param).toString() !== "Invalid Date"){
      date = new Date(param);
      unix = date.valueOf()*1000;
      nat = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
      console.log(date.toString());
    }
    
  var obj = {
    "unix": unix,
    "nat" : nat
  }

  res.send(obj);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 3000!');
});