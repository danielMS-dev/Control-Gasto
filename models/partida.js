const mongoose = require("mongoose");

const partidaScheema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            maxlength: 500,
            trim: true
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("partida", partidaScheema);