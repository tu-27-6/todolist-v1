const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const mongoose = require('mongoose')
const app = express()

//save to do tasks

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs")

//connect to mongoose server
mongoose.connect('mongodb://localhost:27017/todoListDB', { useNewUrlParser: true })

//create schema
const itemsSchema = {
    name: String
}

//create model schema
const Item = mongoose.model('Item', itemsSchema)

//create mongoose
const item1 = new Item({
    name: 'Welcome to your todolist'
})

const item2 = new Item({
    name: 'Hit + button to add new item'
})

const item3 = new Item({
    name: '<-- Hit this to delete an item'
})

const defaultItems = [item1, item2, item3]



//use css, image, js file in expressjs
app.use(express.static("public"))

//home page
app.get("/", (req, res) => {
    const day = date.getDate()
    
    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.error(err)
                }
                else {
                    console.log('Sucess')
                }
            })
            res.redirect('/')
        }
        else {
            //render "list.ejs" to the browser
            res.render("list", { listTitle: day, newItems: foundItems })
        }

    })
    

});


app.post("/", (req, res) => {
    //take data from input
    const itemName = req.body.newItem

    const item = new Item({
        name: itemName
    })

    item.save()

    res.redirect('/')
    
})

//delete item
app.post('/delete', (req, res) => {
    const checked = req.body.checkbox
    
    Item.findByIdAndRemove(checked, (err) => {
        if(!err) {
            console.log('Successfully deleted item')
            res.redirect('/')
        }
    })
})

app.listen(3000, () => {
    console.log("Server start at port 3000")
})
