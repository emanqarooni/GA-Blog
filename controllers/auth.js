const User = require("../models/user")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

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
  if (req.body.gender === "Female") {
    imageUrl =
      "https://wallpapers.com/images/hd/funny-profile-picture-i0ycvblvrynk5dh3.jpg"
  } else {
    imageUrl =
      "https://wallpapers.com/images/hd/funny-profile-picture-ylwnnorvmvk2lna0.jpg"
  }

  //register the user
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    gmail: req.body.gmail,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    image: imageUrl,
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

//here i will do the forget password functionality
//I used this website for help / https://medium.com/@kanishksinghmaurya/reset-password-forget-password-implementation-using-node-js-mongodb-nodemailer-jwt-7b2fe9597ca1
exports.auth_forgetpass_get = async (req, res) => {
  res.render("auth/forget-password.ejs")
}
exports.auth_forgetpass_post = async (req, res) => {
  const gmail = req.body
  const user = await User.findOne(gmail)
  if (!user) {
    return res.send("email not found")
  }

  const token = crypto.randomBytes(20).toString("hex")
  user.resetPasswordToken = token
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  const resetLink = `http://localhost:3000/auth/forget-password/${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.gmail,
    subject: "Password Reset Request",
    html: `
  <p> Hello ${user.username},</p>
  <p> Click here to reset your password</p>
  <a href="${resetLink}">${resetLink}</a>
  `,
  }

  await transporter.sendMail(mailOptions)
  res.send("Password reset email is sent")
}

//now to put a new password
exports.auth_newpass_get = async (req, res) => {
  const token = req.params.token

  const use = await User.findOne({
    resetPasswordToken: token,
  })
  if (!user || user.resetPasswordExpires < Date.now()) {
    return res.send("Password reset token is invalid or has expired")
  }
  res.render("auth/new-password.ejs", { token })
}
exports.auth_resetpass_post = async (req, res) => {
  const token = req.params.token
  const password = req.body
  const confirmPassword = req.body

  const user = await User.findOne({ resetPasswordToken: token })

  if (!user || user.resetPasswordExpires < Date.now()) {
    return res.send("Token is invalid or has expired")
  }

  if (password !== confirmPassword) {
    return res.send("Passwords do not match")
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  user.password = hashedPassword

  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()
  res.send("You have a new password now YAY!")
}
