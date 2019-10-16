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

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


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

app.use((req, res, next) => {
   res.locals.currentUser = req.user
   next()
})

app.use(indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(3000, process.env.IP, () => { console.log('The yelpCamp Server is running!!') })