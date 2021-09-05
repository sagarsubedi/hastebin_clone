const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))

app.set('view engine', 'ejs');

const Document = require("./models/Document");
mongoose.connect("mongodb://localhost:27017/hastebin", {
    useUnifiedTopology:true,
    userNewUrlParser: true,
});

app.get("/", (req,res) => {
    const code = "hello this is a test. Landing page.";
    res.render('code-display', {code});
});



app.get('/new', (req,res) => {
    res.render("new");
})


app.post("/save", async (req,res) => {
    const value = req.body.value;

    try {
        const document = await Document.create({value});
        res.redirect(`/${document.id}`)
    } catch (error) {
        res.render("new", {value})
    }
    
})

app.listen(3000);