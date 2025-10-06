//require router
const router = require("express").Router()

//require comment controller
const commentCtrl = require("../controllers/comments")

//routes
router.post("/:blogId", commentCtrl.comment_create_post)


//export
module.exports = router
