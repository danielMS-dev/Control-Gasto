const Transacion = require("../models/transaccion")
const express = require("express")
const { errorHandler } = require("../helpers/dbErrorHandler")


exports.read = (req, res) =>{
    return res.json(req.Transaccion) 
}
exports.trxById = (req, res, next, id) => {
    Transaccion.findById(id)
        .exec((error, datos) => {
            if (error || !datos) {
                return res.status(400).json({
                    error: "Transacción no encontrada"
                })
            }
            req.Transaccion = datos
            next()
        })
}

exports.create = (req, res) => {
    const trx = new Transaccion(req.body)
    trx.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.update = (res, req) => {
     Transaccion.findOneAndUpdate(
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
    Transaccion.findOneAndUpdate(
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
    
    Transaccion.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, datos) => {
            if (error) {
                return res.status(400).json({
                    error: "Transacción no encontrado"
                });
            }
            res.json(datos);
        });
    };
