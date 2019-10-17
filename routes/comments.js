var express = require("express")
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//==============================================================================
//    COMMENTS ROUTES
//==============================================================================

router.get('/new', middleware.isLoggedIn, (req, res) => {
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
router.post('/', middleware.isLoggedIn, (req, res) => {
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
               req.flash("success", "Comment added successfully")
               res.redirect('/campgrounds/' + campground._id)
            }
         })
      }
   })
})

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
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
router.put("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
      if (err) {res.redirect("back")}
      else {
         req.flash("success", "Comment updated successfully")
         res.redirect("/campgrounds/" + req.params.id)
      }
   })
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
   Comment.findByIdAndRemove(req.params.comment_id, (err) => {
      if (err) {res.redirect("back")}
      else {
         req.flash("success", "Comment deleted successfully")
         res.redirect("/campgrounds/" + req.params.id)
      }
   })
})

module.exports = router
