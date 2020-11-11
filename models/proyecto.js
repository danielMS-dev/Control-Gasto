const mongoose = require("mongoose");


const proyectoScheema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            maxlength: 500,
            trim: true
        },
        contacto: {
            type: String,
            maxlength: 50,
            trim: true
        },
        descripcionContacto: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        presupuesto: {
            type: Number,
            default: 0
        },
        estado: {
            type: String,
            default: "Activa",
            enum: ["Activa", "Inactiva", "Eliminada"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("proyecto",proyectoScheema);