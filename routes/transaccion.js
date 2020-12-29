const express = require("express")
const router = express.Router()

const {
    create,
    read,
    remove,
    update,
    list,
    trxById
} = require("../controllers/transaccion") 
const{
    requireSignin,
    isAuth
} = require("../controllers/auth")

const {
    userById
} = require("../controllers/usuario")




router.get("/trx/:trxId", requireSignin, read)
router.get("/trxs", requireSignin, list)

router.post("/trx/create/:userId", requireSignin, isAuth, create)
router.delete("/trx/:userId", requireSignin, isAuth, remove)
router.put("/trx/:trxId/:userId", requireSignin, isAuth, update)

// paramas
router.param("userId", userById)
router.param("trxId", trxById) 

module.exports = router 