//require router
const router = require("express").Router()

//require comment controller
const commentCtrl = require("../controllers/comments")

//routes
router.post("/:blogId", commentCtrl.comment_create_post)
router.put("/:commentId", commentCtrl.comment_update_put)


//export
module.exports = router
