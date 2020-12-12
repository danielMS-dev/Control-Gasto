const ItemPartida = require("../models/itemPartida")
const express = require("express")
const { errorHandler } = require("../helpers/dbErrorHandler")


exports.read = (req, res) =>{
    return res.json(req.ItemPartida) 
}
exports.itemPartidaById = (req, res, next, id) => {
    ItemPartida.findById(id)
        .exec((error, datos) => {
            if (error || !datos) {
                return res.status().json({
                    error: "Item de partida, no encontrado"
                })
            }
            req.ItemPartida = datos
            next()
        })
}

exports.create = (req, res) => {
    const itemPartida = new ItemPartida(req.body)
    itemPartida.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.update = (res, req) => {
     ItemPartida.findOneAndUpdate(
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
    ItemPartida.findOneAndUpdate(
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
    
    ItemPartida.find()
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
