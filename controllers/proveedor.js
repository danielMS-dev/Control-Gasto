const Proveedor = require("../models/proveedor")
const { errorHandler } = require("../helpers/dbErrorHandler")


exports.read = (req, res) =>{
    return res.json(req.Proveedor) 
}
exports.proveedorById = (req, res, next, id) => {
    Proveedor.findById(id)
        .exec((error, datos) => {
            if (error || !datos) {
                return res.status().json({
                    error: "Item de partida, no encontrado"
                })
            }
            req.Proveedor = datos
            next()
        })
}

exports.create = (req, res) => {
    const proveedor = new Proveedor(req.body)
    proveedor.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.update = (res, req) => {
     Proveedor.findOneAndUpdate(
        {id: req.body.id},
        {$set: req.body},
        {new: true},
        (error, data) => {
            if(error){
                req.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(data)
        })
}

exports.remove = (res, req) => {
    req.body.estado = "Eliminada"
    Proveedor.findOneAndUpdate(
       {id: req.body.id},
       {$set: req.body},
       {new: true},
       (error, data) => {
           if(error){
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
    
    Proveedor.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, datos) => {
            if (error) {
                return res.status(400).json({
                    error: "Proveedor no encontrado"
                });
            }
            res.json(datos);
        });
    };
