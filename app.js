var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true})

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create({
//    name: 'Granite Hill',
//    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80'
// }, (err, campground) => {
//    if (err) {console.log(err)}
//    else {console.log(campground)}
// })

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

//================
//    ROUTES
//================

app.get('/', (req, res) => {
   res.render('landing')
})

app.get('/campgrounds', (req, res) => {
   Campground.find({}, (err, campgrounds) => {
      if (err) {console.log(err)}
      else {res.render('campgrounds', { campgrounds: campgrounds })}
   })
})

app.post('/campgrounds', (req, res) => {
   if (req.body.newCampgroundName !== '') {
      var newCampground = { name: req.body.newCampgroundName, 
                            image: req.body.newCampgroundImage }
      Campground.create(newCampground, (err, campground) => {
         if (err) {console.log(err)}
         else {console.log(campground)}
      })
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