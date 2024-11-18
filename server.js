require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const http = require('http');


const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));



//connecting to the database via mongoose

mongoose.connect(process.env.MONGODB_URI)
 .then(()=> {
    console.log("Connected to the database Successfully!")
 })
  .catch((error) => {
    console.log("Cannot connect to the database " + error);
  });


  //getting the date
  //database Schema

const booksSchema = {
        author: String,
        title: String,
        currentDate: String

}; 

//setting up the model
const Book = mongoose.model("book", booksSchema);



//setting up my routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    const author = req.body.author;
    const title = req.body.title;

//getting the full time
    const date = new Date(2024, 10, 10);
    const options = { day: 'numeric', weekday: 'short', year: 'numeric' };
    const currentDate = date.toLocaleDateString('en-US', options);
    
    
   const newBook = new Book({
    author: author,
    title: title,
    currentDate: currentDate
    
   })

   newBook.save()
    .then(()=> {
        res.redirect("/")
        console.log("new book saved!");
    })
     .catch((error)=> {
        console.log(error);
     })
});

//getting all books displayed

app.get("/booklists", (req, res) => {
    Book.find({})
     .then((foundBooks) => {
        res.render("booklists", {allBookList: foundBooks});
     })
      .catch((error) => {
        console.log("Cannot find book list. Try Again Later!" + error);
      })
})





app.listen(process.env.PORT, ()=>{
    console.log("Connected to the server Successfully!")
})
