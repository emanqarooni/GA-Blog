const mongoose = require("mongoose")

//the schema is from the mongoose library
const blogsSchema = new mongoose.Schema({
  images: [{
    type: String
  }],
  video: {
    type: String
  },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: {
    type: String,
    required: true
  },
    favoritedByUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true //createdAt, updatedAt: if i want to create a record, you should be logging the when data is created and what time it is updated
})

//creating the model then connect it with the schema
const Blog = mongoose.model("Blog", blogsSchema)

//export the model
module.exports = Blog


