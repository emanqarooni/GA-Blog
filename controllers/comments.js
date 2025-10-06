const Comment = require("../models/comment")
const Blog = require("../models/blog")

exports.comment_create_post = async (req, res) => {
  const comment = await Comment.create({
    message: req.body.message,
    owner: req.session.user._id,
    blogId: req.params.blogId,
  })
  res.redirect(`/blogs/${req.params.blogId}`)
}
