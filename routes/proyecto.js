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


router.get("/proyecto/:idProyecto", requireSignin, read)
router.get("/proyecto", requireSignin, list)

router.post("/proyecto/create/:idUser", requireSignin, isAuth, create)

router.put("/proyecto/:idProyecto/:idUser", requireSignin, isAuth, update)

router.delete("/proyecto/:idProyecto/:idUser", requireSignin, isAuth, remove)

//PARAM
router.param("idProyecto", proyectoById)
router.param("idUser", userById)

module.exports = router