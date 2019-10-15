var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment")

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

seedDB()

mongoose.connect('mongodb://localhost:27017/yelp_camp', options)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

//================
//    ROUTES
//================

app.get('/', (req, res) => {
   res.render('landing')
})

// Index Route    /campgrounds      GET   Show all campgrounds
app.get('/campgrounds', (req, res) => {
   Campground.find({}, (err, campgrounds) => {
      if (err) {console.log(err)}
      else {res.render('campgrounds/index', { campgrounds: campgrounds })}
   })
})

// Create Route   /campgrounds      POST  Add a new campground to the db
app.post('/campgrounds', (req, res) => {
   if (req.body.newCampgroundName !== '') {
      var newCampground = { name: req.body.newCampgroundName, 
                            image: req.body.newCampgroundImage,
                            description: req.body.description}
      Campground.create(newCampground, (err, campground) => {
         if (err) {console.log(err)}
         else {console.log(campground)}
      })
   }
   // There are two /campground routes, but the default is to the .get route
   res.redirect('/campgrounds')
})

// New Route      /campgrounds/new  GET   Displays for to make a new campground
app.get('/campgrounds/new', (req, res) => {
   res.render('campgrounds/new')
})

// Show Route     /campgrounds/:id         GET   Shows info about one campground
app.get('/campgrounds/:id', (req, res) => {
   Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      if(err) {console.log(err)}
      else {
         res.render('campgrounds/show', {campground: foundCampground})
      }
   })
})

//=======================
//    COMMENTS ROUTES
//=======================

app.get('/campgrounds/:id/comments/new', (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      if (err) {console.log(err)}
      else {res.render('comments/new', {campground: campground})}
   })
})

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })