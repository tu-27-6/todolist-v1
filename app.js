const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//fix scope
var items = [];
var day;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();
    var currentDay = today.getDay();

    //format day
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    day = today.toLocaleDateString("en-US", options);

    res.render("list", { newDay: day , newItems: items});
});

app.post("/", (req, res) => {
    //take data from input
    var item = req.body.newItem;

    items.push(item);

    //redirect the user to a different URL
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server start at port 3000");
});
