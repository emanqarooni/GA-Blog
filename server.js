//require express
const express = require("express")
//invoke express
const app = express()
//require libraries
const logger = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
require('dotenv').config()
const passUserToView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")
//db connection
const db = require('./config/db')
//Use middlewares
app.use(logger("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use('/public/uploads', express.static('public/uploads'))
// const path= require("path")
// app.use(express.static(path.join(__dirname, "public")))
app.use(express.static("public"))
app.use(passUserToView)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//setting up routers
const authRouter = require("./routes/auth")
const blogRouter = require("./routes/blogs")
const userRouter = require('./routes/users.js')
const commentRouter = require("./routes/comments")
//using routers
app.use("/auth", authRouter)
app.use("/blogs", isSignedIn, blogRouter)
app.use('/users', isSignedIn, userRouter)
app.use("/comments", isSignedIn, commentRouter)
//setting up main route
app.get("/", (req, res) => {
  res.render("index.ejs")
})
//port
const PORT = process.env.PORT ? process.env.PORT : 3000
app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
