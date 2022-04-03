const User = require('../models/userSchema')
const Cart = require('../models/cartSchema')
const Order = require('../models/OrderSchema')
const Product = require('../models/productSchema')



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

        let bulkOption = products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },  //import it should be item.product
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                }

            }
        })
        let updateProduct = await Product.bulkWrite(bulkOption, { new: true })
        // console.log("SOLD AND QUANTITY===>", updateProduct);




        res.json({
            success: true,
            data: newOrder,
            updateProduct
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: {}
        })
    }
}



//get all orders to show all in user history page
exports.getOrders = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec();
        //get all order base on orderBy 
        let orders = await Order.find({ orderBy: user._id })
            .populate('products.product')
            .exec()

        res.json({
            success: true,
            data: orders
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: {}
        })
    }

}