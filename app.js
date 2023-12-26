const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactClass');
}

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static')) 
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const param = {};
    res.status(200).render('home.pug', param);
})

app.get('/About', (req, res)=>{
    const param = {};
    res.status(200).render('about.pug', param);
})

app.get('/Courses', (req, res)=>{
    const param = {};
    res.status(200).render('courses.pug', param);
})

app.get('/contact', (req, res)=>{
    const param = {};
    res.status(200).render('contact.pug', param);
   })

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
       console.log("This data has been saved to database")
    }).catch(()=>{
       res.status(404).send("This data has not been saved in database")
    });

})
   app.listen(port, ()=>{
    console.log(`This application is successfully on ${port}`);
})