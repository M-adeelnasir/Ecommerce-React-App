const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, "Coupon name is required"],
        minlength: [6, "Please coupon should be more then 6 char"],
        maxlength: [12, "Please coupon should be less then 12 char"],
    },
    expiry: {
        type: Date,
        required: [true, "expiry Date is required"]
    },
    discount: {
        type: Number,
        required: [true, "Discount is required"]
    }

}, { timestamps: true })


module.exports = mongoose.model('Coupon', couponSchema)