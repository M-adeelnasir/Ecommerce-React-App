const User = require('../models/userSchema')
const Cart = require('../models/cartSchema')
const Order = require('../models/OrderSchema')
const Product = require('../models/productSchema')
const uniqueid = require('uniqueid')



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




//manage orders by admin

//get All orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .sort('-createdAt')
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

//Manage all orders status
exports.orderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        let update = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true })
        res.json({
            success: true,
            data: update
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: {}
        })
    }

}



exports.creatCashOrder = async (req, res) => {
    try {
        const { COD } = req.body

        //if COD is true create order statuts
        if (!COD) {
            return res.status(404).json({
                success: false,
                data: "Cash on delivery failed"
            })
        }

        const user = await User.findOne({ email: req.user.email }).exec()

        const userCart = await Cart.findOne({ orderBy: user._id }).exec()

        const newOrder = await Order.create({
            products: userCart.products,
            paymentIntent: {
                id: uniqueid(),
                amount: userCart.cartTotal,
                currenncy: "USD",
                status: "Cash On delivery",
                created: Date.now(),
                payment_method_types: ["Cash On delivery"],


            },
            orderBy: user._id
        })

        //decreament and increament quantity and sold

        let bulkOption = newOrder.products.map((p) => {
            return {
                updateOne: {
                    filter: { _id: p.product._id },
                    update: { $inc: { quantity: -p.count, sold: +p.count } }
                }
            }
        })

        let updated = await Product.bulkWrite(bulkOption, {})

        console.log("updated====>", updated);
        console.log("New order ===>", newOrder);

        res.json({
            success: true,
            data: newOrder
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: {}
        })
    }
}