var mongoose = require("mongoose")

// OLD OLD OLD OLD
// var commentSchema = mongoose.Schema({
//    text:    String,
//    author:  String
// })

// Installed in C1:36:348
var commentSchema = mongoose.Schema({
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
})

module.exports = mongoose.model("Comment", commentSchema)