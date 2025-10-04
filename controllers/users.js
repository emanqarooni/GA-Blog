const User = require("../models/user")

//showing the user his/her profile
exports.user_profile_get = async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render("users/profile.ejs", {user})
}

//edit profile
exports.user_profile_edit = async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render("users/edit.ejs", {user})
}
