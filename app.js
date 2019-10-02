var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dogs', {useNewUrlParser: true})

var dogSchema = new mongoose.Schema({
   name: String,
   breed: String,
   state: String,
})

var dog = mongoose.model('dog', dogSchema)

var Hank = new dog({
   name: 'Mona',
   breed: 'Redtick Coon Hound',
   state: 'SC'
})

// Hank is being sent to the db
//              dog is what is being returned from the db
Hank.save((err, dog) => {
   if(err) {console.log('Something went wrong')}
   else {
      console.log('We just saved a dog to the db')
      console.log(dog)
   }
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

var campgrounds = [
   { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' },
   { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80' },
   { name: "Mountain Goat's Rest", image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80' }
]

//================
//    ROUTES
//================

app.get('/', (req, res) => {
   res.render('landing')
})

app.get('/campgrounds', (req, res) => {
   res.render('campgrounds', { campgrounds: campgrounds })
})

app.post('/campgrounds', (req, res) => {
   if (req.body.newCampgroundName !== '') {
      var newCampground = { name: req.body.newCampgroundName, image: req.body.newCampgroundImage }
      campgrounds.push(newCampground)
   }
   // There are two /campground routes, but the default is to the .get route
   res.redirect('/campgrounds')
})

app.get('/campgrounds/new', (req, res) => {
   res.render('new.ejs')
})

//================
//    ROUTES
//================

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })