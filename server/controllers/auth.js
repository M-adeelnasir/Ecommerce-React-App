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



// Wishlist Part
// post
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $addToSet: { wishlist: productId } }
        ).exec()    //addtoset to avoid the repeat of same product in schema

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
        })
    }
}

//get the wishlist products
exports.getWishlist = async (req, res) => {
    try {
        const list = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist').exec();
        console.log(list);
        res.json({
            success: true,
            data: list

        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
        })
    }

}
exports.removeFromWislist = async (req, res) => {
    try {
        const { productId } = req.params
        const user = await User.findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: productId } }).exec()

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false
        })
    }
}
