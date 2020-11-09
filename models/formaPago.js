const mongoose = require("mongoose");

const formaPagoScheema  = new mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
            unique: true
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: 500
        },
        estado: {
            type: String,
            default: "Activa",
            enum: ["Activa", "Inactiva", "Eliminada"]
        }
    },
    { timestamps: true }
);

module.exports =mongoose.model("formaPago", formaPagoScheema)