const router = require("express").Router()

//import controller
const authCtrl = require("../controllers/auth")

//routes
router.get("/sign-up", authCtrl.auth_signup_get)

router.post("/sign-up", authCtrl.auth_signup_post)

router.get("/sign-in", authCtrl.auth_signin_get)

router.post("/sign-in", authCtrl.auth_signin_post)

router.get("/sign-out", authCtrl.auth_signout_get)

//forget password routes
router.get("/forget-password", authCtrl.auth_forgetpass_get)

module.exports = router
