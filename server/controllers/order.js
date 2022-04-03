const User = require('../models/userSchema')
const Cart = require('../models/cartSchema')
const Order = require('../models/OrderSchema')



exports.createOrder = async (req, res) => {
    try {
        const { paymentIntent } = req.body.stripeResponse;

        //fined the user
        const user = await User.findOne({ email: req.user.email }).exec();

        let { products } = await Cart.findOne({ orderBy: user._id }).exec();

        let newOrder = await Order.create({
            paymentIntent,
            products,
            orderBy: user._id
        })

        res.json({
            success: true,
            data: newOrder
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            data: {}
        })
    }
}