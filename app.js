const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//save to do tasks
let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//use css, image, js file in expressjs
app.use(express.static("public"));

app.get("/", function (req, res) {
    let today = new Date();
    let currentDay = today.getDay();

    //format day
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleDateString("en-US", options);

    //render "list.ejs" to the browser
    res.render("list", { newDay: day , newItems: items});
});

app.post("/", (req, res) => {
    //take data from input
    let item = req.body.newItem;

    items.push(item);

    //redirect the user to a different URL, ex
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server start at port 3000");
});
