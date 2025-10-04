const router = require("express").Router()

const userCtrl = require("../controllers/users")

router.get("/",userCtrl.user_profile_get)






module.exports = router
