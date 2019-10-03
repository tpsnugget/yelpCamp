var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true})

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

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
      else {res.render('index', { campgrounds: campgrounds })}
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
   res.render('new.ejs')
})

// Show Route     /campgrounds/:id         GET   Shows info about one campground
app.get('/campgrounds/:id', (req, res) => {
   Campground.findById(req.params.id, (err, foundCampground) => {
      if(err) {console.log(err)}
      else {res.render('show', {campground: foundCampground})}
   })
})

//================
//    ROUTES
//================

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })