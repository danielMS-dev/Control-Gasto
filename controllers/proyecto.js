const Proyecto = require("../models/proyecto");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.read = (req, res) => {
    return res.json(req.body)
}

exports.proyectoById = (req, res, next, id) => {
    console.log("proyectoById: " + id)
    Proyecto.findById(id)
        .exec((err, datos) => {
            if (err || !datos) {
                return res.status(400).json({
                    error: "Proyecto no encontrado..."
                })
            }
            console.log("exec: " + datos)
            req.proyecto = datos
            console.log("req.proyecto: " + req.proyecto)
            next()
        })

}

exports.create = (req, res) => {
    var proyecto = new Proyecto(req.body)
    proyecto.save((error, datos) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({ datos })
    })
}

exports.update = (req, res) => {
    console.log("update: " + req.body)
    Proyecto.findOneAndUpdate(
        { _id: req.proyecto._id },
        { $set: req.body },
        { new: true },
        (err, datos) => {
            if (err) {
                res.status(400).body({
                    error: errorHandler(err)
                })
            }
            console.log(datos)
            res.json(datos)
        }
    )
}

exports.remove = (res, req) => {
    req.body.estado = "Eliminada";
    Proyecto.findOneAndUpdate(
        { _id: req._id },
        { $set: req.body },
        { new: true }, // si es verdadero, devuelve el documento modificado en lugar del original. por defecto es falso
        (error, datos) => {
            if (error) {
                res.status(400).body({
                    error: errorHandler(error)
                })
            }
            res.json({ datos })
        }
    )
}
 
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Proyecto.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, datos) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(datos);
        });
};