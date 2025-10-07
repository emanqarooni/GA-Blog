//require blogs model
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")

//API's functionality

//show all blogs from all users
exports.all_blogs_get = async (req, res) => {
  const blogs = await Blog.find().populate("owner").sort({ createdAt: -1 })
  res.render("blogs/index.ejs", { blogs })
}

//show only the user's own blogs
exports.user_blogs_get = async (req, res) => {
  const blogs = await Blog.find({ owner: req.session.user._id }).populate("owner").sort({ createdAt: -1 })
  res.render("blogs/userBlogs.ejs", { blogs })
}

exports.blog_create_get = async (req, res) => {
  res.render("blogs/create.ejs")
}

exports.blog_create_post = async (req, res) => {
  req.body.owner = req.session.user._id;

  req.body.images = []
  if (req.files["images"]) {
    req.files["images"].forEach((file) => {
      req.body.images.push(file.path)
    })
  }

  if (req.files["video"]) {
    req.body.video = req.files["video"][0].path
  }

  await Blog.create(req.body)
  res.redirect("/blogs")
}

exports.blog_show_get = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId).populate("owner")

  const comments = await Comment.find({ blogId: blog._id }).populate("owner").sort({ createdAt: -1 })

  const userHasFavorited = blog.favoritedByUsers.some(user =>
    user.equals(req.session.user._id)
  )

  res.render("blogs/details.ejs", { blog, userHasFavorited, comments })
}

exports.fav_create_post = async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.blogId, {
    $push: {favoritedByUsers: req.params.userId}
  })

  res.redirect(`/blogs/${req.params.blogId}`)
}

exports.fav_delete = async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.blogId, {
    $pull: {favoritedByUsers: req.params.userId}
  })
  res.redirect(`/blogs/${req.params.blogId}`)
}

exports.blog_edit_get = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId).populate("owner")
  res.render("blogs/edit.ejs", { blog })
}

exports.blog_update_put = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId)

  blog.description = req.body.description

  //appending new images to existing images and checking for duplicate images using the image filenames
  if (req.files && req.files["images"]) {
    req.files["images"].forEach((file) => {
    const fileAlreadyExist = blog.images.some((img) => img.includes(file.originalname))
      if (!fileAlreadyExist){
      blog.images.push(file.path)}
    })
  }

  //replace old video
  if (req.files && req.files["video"]) {
    blog.video = req.files["video"][0].path
  }

  await blog.save()

  res.redirect("/blogs")
}

exports.blog_delete = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.blogId)
  res.redirect("userBlogs")
}

exports.blogs_search_get = async (req, res) => {
  const username = req.query.username //get the name from the search box
  let blogs = [] //this is where the blogs will be display

  if (username) {
    //find the user with that username
    const user = await User.findOne({ username: username })
    if (user) {
      //find all tha blogs that belong to that user
      blogs = await Blog.find({ owner: user._id }).populate("owner").sort({createdAt: -1})
    }
  }
  else {
    //if nothing is searched then show all blogs
    blogs = await Blog.find().populate("owner").sort({createdAt: -1})
  }

  res.render("blogs/index.ejs", { blogs })
}
