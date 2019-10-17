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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", isLoggedIn, checkCommentOwnership, (req, res) => {
   Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
         res.redirect("back")
      }
      else {
         res.render("comments/edit", {
            campground_id: req.params.id,
            comment: foundComment
         })
      }
   })
})

// COMMENT UPDATE ROUTE
router.put("/:comment_id", isLoggedIn, checkCommentOwnership, (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
      if (err) {res.redirect("back")}
      else {res.redirect("/campgrounds/" + req.params.id)}
   })
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", isLoggedIn, checkCommentOwnership, (req, res) => {
   Comment.findByIdAndRemove(req.params.comment_id, (err) => {
      if (err) {res.redirect("back")}
      else {res.redirect("/campgrounds/" + req.params.id)}
   })
})

// MIDDLEWARE
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next()
   }
   res.redirect("/login")
}

function checkCommentOwnership(req, res, next) {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
         if (err) { res.redirect("back") }
         else {
            if (foundComment.author.id.equals(req.user._id)) {
               next()
            }
            else { res.redirect("back") }
         }
      })
   }
   else {
      res.redirect("back")
   }
}

module.exports = router
