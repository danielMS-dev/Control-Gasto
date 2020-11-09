
const Fp = require("../models/formaPago");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { body } = require("express-validator/check");

exports.read = (req, res) => {
    console.log(req)
    return res.json(req.fp);
}
exports.formaPagoById = (req, res, next, id) => {
    Fp.findById(id)
    .exec((error, datos) => {
        if (error || !datos) {
            return res.status(400).json({
                error: "Forma de pago no encontrada"
            });
        }
        req.fp = datos;
        next();
    })
}
exports.create = (req, res) => {
    console.log(req.body)
    const fp = new Fp(req.body)

    fp.save((error, datos) => {
        if(error){
            return res.status(400).json({
                error : errorHandler(error)
            })
        }
        res.json(datos)
    })
}

exports.list = (req, res) => {
let order = req.query.order ? req.query.order : "asc";
let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
let limit = req.query.limit ? parseInt(req.query.limit) : 6;

Fp.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, datos) => {
        if (err) {
            return res.status(400).json({
                error: "Formas de pagos no encontradas"
            });
        }
        console.log(datos)
        res.json(datos);
    });
};

exports.remove = (req, res) => {
    Fp.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
}

exports.update = (req, res) => {
    Fp.findOneAndUpdate(
        { _id: req.fp._id },
        { $set: req.body },
        { new: true },
        (error, datos) => {
            if (error) {
                return res.status(400).json({
                    error: error
                });
            }
           
            res.json(datos);
        }
    );
}