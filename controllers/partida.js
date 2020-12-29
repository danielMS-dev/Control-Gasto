const Partida = require("../models/partida")
const { errorHandler } = require("../helpers/dbErrorHandler")


exports.read = (req, res) => {
    return res.json(req.Partida)
}
exports.partidaById = (req, res, next, id) => {
    Partida.findById(id)
        .exec((error, datos) => {
            if (error || !datos) {
                return res.status().json({
                    error: "Item de partida, no encontrado"
                })
            }
            req.Partida = datos
            next()
        })
}

exports.create = (req, res) => {
    console.log(req.body)
    const partida = new Partida(req.body)
    partida.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.update = (res, req) => {
    Partida.findOneAndUpdate(
        { id: req.body.id },
        { $set: req.body },
        { new: true },
        (error, data) => {
            if (error) {
                req.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(data)
        })
}

exports.remove = (res, req) => {
    req.body.estado = "Eliminada"
    Partida.findOneAndUpdate(
        { id: req.body.id },
        { $set: req.body },
        { new: true },
        (error, data) => {
            if (error) {
                req.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(data)
        })
}


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Partida.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, datos) => {
            if (error) {
                return res.status(400).json({
                    error: "Item de partida, No encontrado"
                });
            }
            res.json(datos);
        });
};
