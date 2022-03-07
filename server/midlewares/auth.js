const admin = require('../firebase/index');

exports.checkAuth = (req, res, next) => {
    console.log(req.headers);
}

