var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var waitlist = [
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

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.get("/api/waitlist/:waitlist", function(req, res) {
    var chosen = req.params.waitlist;
  
    console.log(chosen);
  
    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === waitlist[i].customerID) {
        return res.json(waitlist[i]);
      }
    }
  
    return res.json(false);
});

app.post("/api/waitlist", function(req, res) {

    var newreservation = req.body;
  
    newreservation.customerID = newreservation.customerName.replace(/\s+/g, "").toLowerCase();
  
    console.log(newreservation);
  
    waitlist.push(newreservation);
  
    res.json(newreservation);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  