//require express
const express = require("express")

//invoke express
const app = express()

//require libraries
const logger = require("morgan")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const methodOverride = require("method-override")
const session = require("express-session")
require('dotenv').config()
const passUserToView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")

//db connection
const db = require('./config/db')

//Use middlewares
app.use(express.static('public'))
app.use(logger("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use((req, res, next) => {
//   res.locals.user = req.session.user
//   next()
// })
app.use(express.static('public')) //styling

//setting up routers
const authRouter = require("./routes/auth")

//using routers
app.use("/auth", authRouter)

// const userRouter = require('./routes/users.js')
// app.use('/users', userRouter)

//setting up main route
app.get("/", (req, res) => {
  res.render("index.ejs")
})

//port
const PORT = process.env.PORT ? process.env.PORT : 3000
app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
