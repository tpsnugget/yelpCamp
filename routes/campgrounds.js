var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")

//==============================================================================
//    ROUTES
//==============================================================================

// Index Route    /campgrounds      GET   Show all campgrounds
router.get('/', (req, res) => {
   Campground.find({}, (err, campgrounds) => {
      if (err) { console.log(err) }
      else {
         res.render('campgrounds/index', { campgrounds: campgrounds })
      }
   })
})

// Create Route   /campgrounds      POST  Add a new campground to the db
router.post('/', middleware.isLoggedIn, (req, res) => {
   if (req.body.newCampgroundName !== '') {
      var newCampground = {
         name: req.body.newCampgroundName,
         image: req.body.newCampgroundImage,
         description: req.body.description,
         author: {
            id: req.user._id,
            username: req.user.username
         }
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
   res.render('campgrounds/new')
})

// Show Route     /campgrounds/:id         GET   Shows info about one campground
router.get('/:id', (req, res) => {
   Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      if (err) { console.log(err) }
      else {
         res.render('campgrounds/show', { campground: foundCampground })
      }
   })
})

// EDIT ROUTE for Campgrounds
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findById(req.params.id, (err, foundCampground) => {
      res.render("campgrounds/edit", { campground: foundCampground })
   })
})

// UPDATE ROUTE for Campgrounds
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
      if (err) { res.redirect("/campgrounds") }
      else {
         res.redirect("/campgrounds/" + req.params.id)
      }
   })
})

// DESTROY ROUTE for Campgrounds
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findByIdAndRemove(req.params.id, (err) => {
      if (err) { res.redirect("/campgrounds") }
      else { res.redirect("/campgrounds") }
   })
})

module.exports = router