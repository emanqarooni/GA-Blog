const mongoose = require("mongoose")

//the schema is from the mongoose library
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
    last_name: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true //createdAt, updatedAt: if i want to create a record, you should be logging the when data is created and what time it is updated
})

//creating the model then connect it with the schema
const User = mongoose.model("User", userSchema)

//export the model
module.exports = User


