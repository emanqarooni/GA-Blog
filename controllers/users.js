const User = require("../models/user")

//showing the user his/her profile
exports.user_show_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("users/profile.ejs", { user })
}

//edit profile
exports.user_edit_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("users/edit.ejs", { user })
}

exports.user_update_put = async (req, res) =>{
  const user =await User.findById(req.params.userId)
  user.set(req.body)
  await user.save()
  res.redirect(`/users/${req.params.userId}`)

}
