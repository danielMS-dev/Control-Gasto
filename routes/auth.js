const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout
} = require("../controllers/auth")

const { userSignupValidator } = require("../validator")

/**
 * @swagger
 * /api/signup:
 *  get:
 *    summary: signup user
 *    description: Use to add new user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              nombres:
 *                  type: string
 *                  description: nombres user require
 *              paterno:
 *                  type: string
 *                  description: paterno user require
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user require
 *    responses:
 *      "200":
 *        description: A successful response
 *      "400":
 *        description: A bad request response
 */
router.post("/signup",userSignupValidator, signup);

/**
 * @swagger   
 * /api/signin: 
 *  post:
 *    summary: signin user
 *    description: Use to request signin user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.post("/signin", signin);

/**
 * @swagger
 * /api/signout:
 *  get:
 *    summary: signout user
 *    description: Use to request logout user
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/signout", signout);

module.exports = router;

 