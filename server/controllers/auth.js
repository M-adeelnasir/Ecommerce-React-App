const User = require('../models/userSchema')

exports.updateOrCreateUser = async (req, res) => {
    const { email, picture, name } = req.user;
    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true })
    if (user) {
        console.log("User Updated", user);
        res.status(200).json({
            success: true,
            data: user
        })
    } else {
        const newUser = await User({
            name,
            email,
            picture
        }).save()
        console.log("User Created", newUser);
        res.status(200).json({
            success: true,
            data: newUser
        })
    }

}

exports.currentUser = async (req, res) => {
    await User.findOne({ emial: req.user.email }).exec((err, user) => {
        if (err) throw new Error(err)
        res.json(user)
    })
}