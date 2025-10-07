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

exports.comment_update_put = async (req, res) => {
  const comment =  await Comment.findByIdAndUpdate(req.params.commentId, req.body, {new: true})
  res.redirect(`/blogs/${comment.blogId}`)
}

exports.comment_delete = async (req, res) => {
  const comment =  await Comment.findByIdAndDelete(req.params.commentId, {new: true})
  res.redirect(`/blogs/${comment.blogId}`)
}
