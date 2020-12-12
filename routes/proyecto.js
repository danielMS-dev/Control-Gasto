const express = require("express")
const router = express.Router()


const {
    create,
    read,
    update,
    remove,
    list,
    proyectoById
} = require("../controllers/proyecto")

const { 
    requireSignin,
    isAuth 
} = require("../controllers/auth")

const { userById } = require("../controllers/usuario")


router.get("/proyecto/:idProyecto/:idUser", requireSignin, isAuth, read)
router.get("/proyecto/:idUser", requireSignin, isAuth, list)

router.post("/proyecto/create/:idUser", requireSignin, isAuth, create)

router.put("/proyecto/:idUser", requireSignin, isAuth, update)

router.delete("/proyecto/:idUser", requireSignin, isAuth, remove)

//PARAM
router.param("idProyecto", proyectoById)
router.param("idUser", userById)

module.exports = router