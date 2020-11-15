const express = require("express")
const router = express.Router()

const {
    read,
    formaPagoById,
    create,
    update,
    remove,
    list
} = require("../controllers/formaPago")

const { 
    requireSignin,
    isAuth 
} = require("../controllers/auth")

const { userById } = require("../controllers/usuario")


router.get("/formaPago/list/:userId", requireSignin, isAuth, list)
router.get("/formaPago/:formaPagoId/:userId", requireSignin, isAuth, read)

router.post("/formaPago/create/:userId", requireSignin, isAuth, create)

router.post("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, update)

router.delete("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, remove)

//Router Param

router.param("formaPagoId", formaPagoById)
router.param("userId", userById)

//Export
module.exports = router