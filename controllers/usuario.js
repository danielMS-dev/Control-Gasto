const User = require("../models/usuario");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest 

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    User.find()
        .select("-salt -hashed_password")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, datos) => {
            if (err) {
                return res.status(400).json({
                    error: "Usuarios no encontrados"
                });
            }
            console.log(datos)
           datos.salt = undefined;
            datos.hashed_password = undefined;
            console.log(datos.profile)
            res.json(datos);
        });
};
