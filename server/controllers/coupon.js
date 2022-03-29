const Coupon = require('../models/couponSchema');



//create coupon (admin only)
exports.create = async (req, res) => {

    const { name, expiry, discount } = req.body

    try {

        const coupon = await Coupon.create({ name, expiry, discount })

        res.json({
            success: true,
            data: coupon
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: {}
        })
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

