const admin = require('../firebase/index');

exports.checkAuth = async (req, res, next) => {
    console.log(req.headers);

    try {

        const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        // console.log(currentUser);
        req.user = currentUser;
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: "INVALID OR EXPIRED TOKEN "
        })
    }
}

