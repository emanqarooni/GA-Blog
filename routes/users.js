const router = require("express").Router()
const userCtrl = require("../controllers/users")

//require multer
const upload = require("../middleware/multer")

router.get("/profile/:userId", userCtrl.user_show_get)
router.get("/profile/:userId/edit", userCtrl.user_edit_get)
router.post(
  "/profile/:userId",
  upload.single("image"),
  userCtrl.user_update_put
)
router.put("/profile/:userId", userCtrl.user_update_put)
module.exports = route
