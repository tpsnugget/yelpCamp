var mongoose = require("mongoose")

// OLD OLD OLD OLD
// var campgroundSchema = new mongoose.Schema({
//    name:          String,
//    image:         String,
//    description:   String,
//    comments:      [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref:  "Comment"
//       }
//    ]
// })

// Changed in C1:36:349
var campgroundSchema = new mongoose.Schema({
   name:          String,
   price:         String,
   image:         String,
   description:   String,
   // ADDED ====================================================================
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   // ==========================================================================
   comments:      [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:  "Comment"
      }
   ]
})

module.exports = mongoose.model('Campground', campgroundSchema)