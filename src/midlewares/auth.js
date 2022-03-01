class Auth {

    constructor() {
        this.verify = this.verify.bind(this);
    }

    verify(req, res, next) {
        if (req.session.auth === true) {
            next();
        } else {
            res.status(401).json({ auth: false });
        }
    }

    session(req, res) {
        if (req.session.auth === true) {
            res.status(200).json({ auth: true, nombre: req.session.nombre, id: req.session.identificacion, rol: req.session.rol });
        } else {
            res.status(401).json({ auth: false });
        }
    }
}

module.exports = Auth;