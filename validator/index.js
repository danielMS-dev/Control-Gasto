exports.userSignupValidator = (req, res, next) => {
    req.check("nombres", "El nombre es requerido.").notEmpty();
    req.check("paterno", "El apellido es requerido.").notEmpty();
    req.check("email","El correo electrónico es requerido.").notEmpty()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .withMessage("El correo electrónico no es válido");
    req.check("password", "Password is required").notEmpty()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe contener al menos 6 caracteres.")
        .matches(/\d/)
        .withMessage("La contraseña debe contener un numero.");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};