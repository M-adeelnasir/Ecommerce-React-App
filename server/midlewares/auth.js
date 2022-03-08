const admin = require('../firebase/index');
const User = require('../models/userSchema')
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


exports.checkAdmin = async (req, res, next) => {
    const { email } = req.user
    const user = await User.findOne({ email }).exec();
    console.log(user.role);
    if (user.role !== 'admin') {
        res.status(403).json({
            data: `${user.name} has no admin previlages`,
            success: false
        })
    }
    else {
        next()
    }
}