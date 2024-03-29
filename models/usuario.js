const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const usuarioScheema = new mongoose.Schema(
    {
        nombres: {
            type: String,
            required: true,
            trim: true
        },
        paterno: {
            type: String,
            required: true,
            trim: true
        },
        materno: {
            type: String,
            trim: true
        },
        rol: {
            type: String,
            default: "Usuario",
            enum: ["Administrador", "Usuario"]
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        usuarioFoto: {
            data: Buffer,
            contentType: String
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: {
           type: String
        }
    },{
        timestamps: true
    }
);
// virtual field
usuarioScheema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// schemas methods
usuarioScheema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("usuario", usuarioScheema);