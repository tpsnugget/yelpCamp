var mongoose = require("mongoose")

var commentSchema = mongoose.Schema({
   text:    "",
   author:  ""
})

module.exports = mongoose.model("Comment", commentSchema)