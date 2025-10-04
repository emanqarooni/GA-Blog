//require blogs model
const Blog = require("../models/blog")

//API's functionality

//show all blogs from all users
exports.all_blogs_get = async (req, res) => {
  const blogs = await Blog.find().populate("owner")
  res.render("blogs/index.ejs", { blogs })
}

//show only the user's own blogs
exports.user_blogs_get = async (req, res) => {
  const blogs = await Blog.find({ owner: req.session.user._id }).populate("owner")
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

  const userHasFavorited = blog.favoritedByUsers.some(user =>
    user.equals(req.session.user._id)
  )

  res.render("blogs/details.ejs", { blog, userHasFavorited })
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

  //appending new images to existing images
  if (req.files && req.files["images"]) {
    req.files["images"].forEach((file) => {
      blog.images.push(file.path)
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
