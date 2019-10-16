var express = require("express"),
   app = express(),
   seedDB = require("./seeds"),
   mongoose = require("mongoose"),
   passport = require("passport"),
   User = require("./models/user"),
   bodyParser = require("body-parser"),
   Comment = require("./models/comment"),
   localStrategy = require("passport-local"),
   Campground = require("./models/campground")


const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

seedDB()

mongoose.connect('mongodb://localhost:27017/yelp_camp', options)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(require("express-session")({
   secret: "Once again Rusty wins cutest dog!",
   resave: false,
   saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//==============================================================================
//    ROUTES
//==============================================================================

app.get('/', (req, res) => {
   res.render('landing')
})

// Index Route    /campgrounds      GET   Show all campgrounds
app.get('/campgrounds', isLoggedIn, (req, res) => {
   Campground.find({}, (err, campgrounds) => {
      if (err) { console.log(err) }
      else { res.render('campgrounds/index', { campgrounds: campgrounds }) }
   })
})

// Create Route   /campgrounds      POST  Add a new campground to the db
app.post('/campgrounds', isLoggedIn, (req, res) => {
   if (req.body.newCampgroundName !== '') {
      var newCampground = {
         name: req.body.newCampgroundName,
         image: req.body.newCampgroundImage,
         description: req.body.description
      }
      Campground.create(newCampground, (err, campground) => {
         if (err) { console.log(err) }
         else { console.log(campground) }
      })
   }
   // There are two /campground routes, but the default is to the .get route
   res.redirect('/campgrounds')
})

// New Route      /campgrounds/new  GET   Displays for to make a new campground
app.get('/campgrounds/new', isLoggedIn, (req, res) => {
   res.render('campgrounds/new')
})

// Show Route     /campgrounds/:id         GET   Shows info about one campground
app.get('/campgrounds/:id', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      if (err) { console.log(err) }
      else {
         res.render('campgrounds/show', { campground: foundCampground })
      }
   })
})

//==============================================================================
//    COMMENTS ROUTES
//==============================================================================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      if (err) { console.log(err) }
      else { res.render('comments/new', { campground: campground }) }
   })
})

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      if (err) {
         console.log(err)
         res.redirect('/campgrounds')
      }
      else {
         Comment.create(req.body.comment, (err, comment) => {
            if (err) { console.log(err) }
            else {
               campground.comments.push(comment)
               campground.save()
               res.redirect('/campgrounds/' + campground._id)
            }
         })
      }
   })
})

//==============================================================================
//    AUTH ROUTES
//==============================================================================
// Show register FORM
app.get("/register", (req, res) => {
   res.render("register")
})

// Signup Logic
app.post("/register", (req, res) => {
   var newUser = new User({ username: req.body.username })
   User.register(newUser, req.body.password, (err, user) => {
      if (err) {
         console.log(err)
         return res.render("register")
      }
      passport.authenticate("local")(req, res, () => {
         res.redirect("/campgrounds")
      })
   })
})

//==============================================================================
//    LOGIN ROUTES
//==============================================================================
app.get("/login", (req, res) => {
   res.render("login")
})

app.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), (req, res) => {
   
})

//==============================================================================
//    LOGOUT ROUTE
//==============================================================================
app.get("/logout", (req, res) => {
   req.logout()
   res.redirect("/login")
})

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next()
   }
   res.redirect("/login")
}

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })