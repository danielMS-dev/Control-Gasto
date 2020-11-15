const express = require("express")
const { create } = require("../models/usuario")
const router = express.Router()


const {
    create,
    read,
    update,
    remove,
    list,
    itemPartidaById
} = require("../controllers/itemPartida")
const { requireSignin, isAuth }  = require("../controllers/auth")
const { userById } = require("../controllers/usuario")


// GET
router.get("/itemPartida/:userId",requireSignin, isAuth , list)
router.get("/itemPartida/:userId/:itemPartidaId",requireSignin, isAuth , read)

router.post("/itemPartida/create/:userId", requireSignin. isAuth, create)

router.put("/ItemPartida/:userId",requireSignin, isAuth, update)

router.delete("/ItemPartida/:userId",requireSignin, isAuth, remove)

//routerParam

router.param("itemPartidaId", itemPartidaById)
router.param("userId", userById)


module.exports = router
