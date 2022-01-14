const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

//save to do tasks
const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//use css, image, js file in expressjs
app.use(express.static("public"));

//home page
app.get("/", function (req, res) {
    const day = date.getDate();

    //render "list.ejs" to the browser
    res.render("list", { listTitle: day , newItems: items});
});


app.post("/", (req, res) => {
    //take data from input
    const item = req.body.newItem;
    
    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

//work page 
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List" , newItems: workItems});
})


app.listen(3000, function () {
    console.log("Server start at port 3000");
});
