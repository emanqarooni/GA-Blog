const User = require("../models/user")
const Blog = require("../models/blog")
//showing the user his/her profile
exports.user_show_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  const favoritedBlogs = await Blog.find({
    favoritedByUsers: req.params.userId
  }).populate("owner")
  res.render("users/profile.ejs", { user, favoritedBlogs })
}
//edit profile
exports.user_edit_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("users/edit.ejs", { user })
}

exports.user_update_put = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`
    } else {
      req.body.image = user.image
    }
    await User.findByIdAndUpdate(req.params.userId, req.body)
    req.session.user.image = req.body.image
    res.redirect(`/users/profile/${req.params.userId}`)
  } catch (err) {
    console.error("Error updating user:", err)
    res.send("Error updating profile")
  }
}
