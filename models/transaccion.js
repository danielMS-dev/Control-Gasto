const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const transaccionScheema = new mongoose.Schema(
    {
        proyectoId: {
            type: ObjectId,
            ref: "proyecto",
            required: true
        },
        partidaId: {
            type: ObjectId,
            ref: "partida",
            required: true
        },
        proveedorId: {
            type: ObjectId,
            ref: "proveedor",
            required: true
        },
        formaPagoId: {
            type: ObjectId,
            ref: "itemPartida",
            required: true
        },
        usuarioId: { 
            type: ObjectId,
            ref: "usuario",
            required: true
        },
        usuarioTrx: {
            type: String,
            required: true,
            trim: true
        },
        tipoTrx: {
            type: String,
            default: "Gasto",
            enum: ["Gasto","Ingreso"]
        },
        monto: {
            type: Number,
            default: 0
        },
        fechaTrx: {
            type: Date
        },
        observacion: {
            type: String,
            trim: true,
            maxlength: 500
        },
         estado: {
            type: String,
            default: "Activa",
            enum:["Activa, Anulada"]
        },
        ObservacionAnulacion: {
            type: String,
            maxlength: 500,
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("transaccion", transaccionScheema);

