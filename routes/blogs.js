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

//export
module.exports = router
