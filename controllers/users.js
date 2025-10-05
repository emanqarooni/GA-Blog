const User = require("../models/user")

//showing the user his/her profile
exports.user_show_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("users/index.ejs", { user })
}

//edit profile
exports.user_edit_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("users/edit.ejs", { user })
}
