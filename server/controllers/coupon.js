const Coupon = require('../models/couponSchema');



//create coupon (admin only)
exports.create = async (req, res) => {

    // console.log(req.body);
    // return

    //as we send the data as coupon
    const { name, expiry, discount } = req.body.coupon

    try {

        const coupon = await Coupon.create({ name, expiry, discount })

        res.json({
            success: true,
            data: coupon
        })

    } catch (err) {
        console.log(err);
        if (err.code == 11000) {
            const message = `Dublicate Field Enter at index ${err.index}`
            res.status(400).json({
                success: false,
                data: message
            })
        } else {
            res.status(401).json({
                success: false,
                data: {}
            })
        }
    }
}


//remove coupon (admin only)
exports.remove = async (req, res) => {
    try {

        const coupon = await Coupon.findByIdAndDelete(req.params.couponId)
        res.json({
            success: true,
            data: {}
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: {}
        })
    }
}

//list coupon (admin only)
exports.list = async (req, res) => {
    try {
        const coupons = await Coupon.find({})
            .sort({ createdAt: -1 })
            .exec()

        res.json({
            success: true,
            data: coupons
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: {}
        })
    }
}

