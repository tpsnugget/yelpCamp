var express = require("express")
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")

//==============================================================================
//    COMMENTS ROUTES
//==============================================================================

router.get('/new', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      if (err) { console.log(err) }
      else {
         res.render('comments/new', {campground: campground})
      }
   })
})

// OLD OLD OLD OLD
// router.post('/', isLoggedIn, (req, res) => {
//    Campground.findById(req.params.id, (err, campground) => {
//       if (err) {
//          console.log(err)
//          res.redirect('/campgrounds')
//       }
//       else {
//          Comment.create(req.body.comment, (err, comment) => {
//             if (err) { console.log(err) }
//             else {
//                campground.comments.push(comment)
//                campground.save()
//                res.redirect('/campgrounds/' + campground._id)
//             }
//          })
//       }
//    })
// })

// Changed in C1:36:348
router.post('/', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, campground) => {
      if (err) {
         console.log(err)
         res.redirect('/campgrounds')
      }
      else {
         Comment.create(req.body.comment, (err, comment) => {
            if (err) { console.log(err) }
            else {
               // Added in C1:36:348 ===========================================
               comment.author.id = req.user._id
               comment.author.username = req.user.username
               comment.save()
               //===============================================================
               campground.comments.push(comment)
               campground.save()
               res.redirect('/campgrounds/' + campground._id)
            }
         })
      }
   })
})
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next()
   }
   res.redirect("/login")
}

module.exports = router
