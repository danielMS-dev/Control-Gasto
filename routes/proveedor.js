const express = require("express")
const router = express.Router()

const {
    create,
    read,
    remove,
    update,
    list,
    proveedorById
} = require("../controllers/proveedor")

const {
    requireSignin,
    isAuth
} = require("../controllers/auth")

const {
    userById
} = require("../controllers/usuario")



router.get("/proveedor/:proveedorId", requireSignin, read)
router.get("/proveedores", requireSignin, list)

router.post("/proveedor/create/:userId", requireSignin, isAuth, create)
router.delete("/proveedor/:userId", requireSignin, isAuth, remove)
router.put("/proveedor/:proveedorId/:userId", requireSignin, isAuth, update)

// paramas
router.param("userId", userById)
router.param("proveedorId", proveedorById)  

module.exports = router 

