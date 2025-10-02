//to connect our BE to database
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)
//making sure DB is connected
mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`)
})
//to take it to the server.js
module.exports = mongoose
