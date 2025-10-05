const User = require("../models/user")
const bcrypt = require("bcrypt")

//API's main functionlaity/logic
exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  //checking if the username exists or not
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username is already taken")
  }

  //checking if the password and confirmpass are matching or not
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and confirm password must match")
  }

  //encrypt password
  //the number 10 is 10 salting/round of encryption
  //max 15 and min 5
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  let imageUrl
  if(req.body.gender === "Female"){
    imageUrl = "https://wallpapers.com/images/hd/funny-profile-picture-i0ycvblvrynk5dh3.jpg"
  } else {
    imageUrl ="https://wallpapers.com/images/hd/funny-profile-picture-ylwnnorvmvk2lna0.jpg"
  }

  //register the user
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    image: imageUrl
  })
  res.redirect("/")
}

exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  //checking if the username exists or not
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed, user does not exist")
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )

  //checking if the password is correct
  if (!validPassword) {
    return res.send("Login failed, password is incorrect")
  }

  //iniitliaze session
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }

  res.redirect("/")
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

