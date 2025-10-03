const mongoose = require("mongoose")
//the schema is from the mongoose library
const commentsSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }
}, {
  timestamps: true //createdAt, updatedAt: if i want to create a record, you should be logging the when data is created and what time it is updated
})
//creating the model then connect it with the schema
const Comment = mongoose.model("Comment", commentsSchema)
//export the model
module.exports = Comment
