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
        }
    },
    { timestamps: true }
);

module.exports =mngoose.model("formaPago", formaPagoScheema);