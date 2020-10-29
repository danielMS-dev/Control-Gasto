const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemPartidaScheema = new mongoose.Schema(
    {
        partidaId :{
            type: ObjectId,
            required: true,
            ref: "partida"
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: 500
        }
    },
    { 
        timestamps: true 
    }
);
module.exports = mongoose.model("itemPartida",itemPartidaScheema);