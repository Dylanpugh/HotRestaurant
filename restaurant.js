var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
    {
        customerName: "Dylan",
        phoneNumber: "9495621919",
        customerEmail: "dylan@dylan.com",
        customerID: "Dylan"
    }
];

var tables = [
    {
        tableNumber: 1,
        reserved: true
    }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/reservations/:reservation", function(req, res) {
    var chosen = req.params.reservation;
  
    console.log(chosen);
  
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].customerID) {
        return res.json(reservations[i]);
      }
    }
  
    return res.json(false);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  