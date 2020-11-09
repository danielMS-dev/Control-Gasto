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
    isAdmin,
    isAuth 
} = require("../controllers/auth")

const { userById } = require("../controllers/usuario")


router.get("/formaPago/:userId", requireSignin, isAuth, list)
router.get("/formaPago/:formaPagoId/:userId", requireSignin, isAuth, read)
router.post("/formaPago/:userId", requireSignin, isAuth, create)
router.put("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, update)
router.delete("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, remove)



router.param("formaPagoId", formaPagoById)
router.param("userId", userById)

module.exports = router