const Proyecto = require("../models/proyecto");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.read = (req, res) => {
  return res.json(req.body) 
}

exports.proyectoById = (req, res, next, id) => {
    Proyecto.find(id).exec((error, datos) => {
        if(error || !datos){
            return res.status(400).json({
                error : errorHandler(error) 
            })
        }
        req.Proyecto = datos
        next()
    })
}

exports.create = (req, res) => {
    var proyecto = new Proyecto(req.body)
    proyecto.save((error, datos) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({datos})
    })
}

exports.update = (res, req) => {
    Proyecto.findOneAndUpdate(
        {_id :req._id},
        {$set: req.body},
        { new: true},
        (error, datos) => {
            if(error){
                res.status(400).body({
                    error: errorHandler(error)
                })
            }
            res.json({datos})
        }
    )
}

exports.remove = (res, req) => {
    req.body.estado = "Eliminada";
    Proyecto.findOneAndUpdate(
        {_id :req._id},
        {$set: req.body},
        { new: true}, // si es verdadero, devuelve el documento modificado en lugar del original. por defecto es falso
        (error, datos) => {
            if(error){
                res.status(400).body({
                    error: errorHandler(error)
                })
            }
            res.json({datos})
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
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            console.log(datos)
            res.json(datos);
        });
    };