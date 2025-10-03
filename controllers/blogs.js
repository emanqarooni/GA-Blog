//require blogs model
const Blog = require("../models/blog")

//require multer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//API's functionality
exports.blog_index_get = async (req, res) => {
  const blog = await Blog.find().populate("owner")
  res.render("blogs/index.ejs", { blog })
}

exports.blog_create_get = async (req, res) => {
  res.render("blogs/create.ejs")
}

exports.blog_create_post = async (req, res) => {
  req.body.owner = req.session.user._id;

  req.body.images = [];
  if (req.files["images"]) {
    req.files["images"].forEach((file) => {
      req.body.images.push(file.path)
    });
  }

  if (req.files["video"]) {
    req.body.video = req.files["video"][0].path
  }

  await Blog.create(req.body)
  res.redirect("/blogs")
}
