const mongoose = require("mongoose");


const proveedorScheema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        rut: {
            type: String,
            unique: true,
            trim: true,
        },
        descripcion: {
            type: String,
            maxlength: 500,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.mongoose.module("proveedor", proveedorScheema);