const express = require("express")
const router = express.Router()

const {
    create,
    read,
    update,
    remove,
    list,
    partidaById
} = require("../controllers/partida")

const {
    requireSignin,
    isAuth
} = require("../controllers/auth")
const { userById } = require("../controllers/usuario")



router.post("/partida/create/:userId", requireSignin, isAuth, create)
router.get("/partida/list/:userId", requireSignin, isAuth, list)
router.get("/partida/:partidaId/:userId", requireSignin. isAuth, read)

router.put("/partida/:userId", requireSignin, isAuth, update)
router.delete("partida/:userid", requireSignin, isAuth, remove)

router.param("userId",userById)
router.param("partidaId", partidaById)


module.exports = router