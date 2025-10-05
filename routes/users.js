const router = require("express").Router()

const userCtrl = require("../controllers/users")

router.get('/:userId',userCtrl.user_show_get)
router.get('/:userId/edit',userCtrl.user_edit_get)





module.exports = router
