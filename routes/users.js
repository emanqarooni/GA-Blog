const router = require("express").Router()

const userCtrl = require("../controllers/users")

router.get("/profile/:userId", userCtrl.user_show_get)
router.get("/profile/:userId/edit", userCtrl.user_edit_get)
router.put("/profile/:userId",userCtrl.user_update_put)
module.exports = router
