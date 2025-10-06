//require router
const router = require("express").Router()

//require blog controller
const blogCtrl = require("../controllers/blogs")

//require multer
const upload = require("../config/multer")

// handle multiple images and one video submissions
const multiUpload = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "video", maxCount: 1 }
])

//routes
router.get("/", blogCtrl.all_blogs_get)
router.get("/create", blogCtrl.blog_create_get)
router.post("/", multiUpload, blogCtrl.blog_create_post)
router.get("/userBlogs", blogCtrl.user_blogs_get)
router.get("/search", blogCtrl.blogs_search_get)
router.get("/:blogId", blogCtrl.blog_show_get)
router.post("/:blogId/favorited-by/:userId", blogCtrl.fav_create_post)
router.delete("/:blogId/favorited-by/:userId", blogCtrl.fav_delete)
router.get("/:blogId/edit", blogCtrl.blog_edit_get)
router.put("/:blogId", multiUpload, blogCtrl.blog_update_put)
router.delete("/:blogId", blogCtrl.blog_delete)


//export
module.exports = router
