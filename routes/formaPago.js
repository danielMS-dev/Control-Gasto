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

/**
 * @swagger   
 * /api/formaPago/list/{userId}: 
 *  get:
 *    summary: Lista forma pago
 *    description: Obtiene una lista de las formas de pago
 *    parameters:
 *     -  name: "userId" 
 *        in: "path"
 *        description: "ID de la persona con permiso para ver las formas de pago"
 *        required: true
 *        type: "ObjectId"
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 *    security:
 *     - api_key: []
 */
router.get("/formaPago/list", requireSignin, list)

router.get("/formaPago/:formaPagoId", requireSignin, read)

router.post("/formaPago/create/:userId", requireSignin, isAuth, create)

router.put("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, update)

router.delete("/formaPago/:formaPagoId/:userId",requireSignin, isAuth, remove)

//Router Param

router.param("formaPagoId", formaPagoById)
router.param("userId", userById)

//Export
module.exports = router