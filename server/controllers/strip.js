const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Cart = require('../models/cartSchema')
const Coupon = require('../models/couponSchema')


const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

exports.createStripIntent = async (req, res) => {
    // console.log(req.body);
    // return


    try {
        //applu coupon
        const { couponApplied } = req.body

        //get user 
        const user = await User.findOne({ email: req.user.email }).exec()

        //get the total ammount
        const { cartTotal, cartTotalAfterDiscount } = await Cart.findOne({ OrderBy: user._id }).exec()

        // console.log("cart total==>", cartTotal, "AFter discount ==>", cartTotalAfterDiscount);
        // check if we have coupon then charge the price after discount other wise the total ammount

        let finalAmount = 0
        if (couponApplied && cartTotalAfterDiscount) {
            finalAmount = cartTotalAfterDiscount * 100
        }
        else {
            finalAmount = cartTotal * 100
        }

        //create a payment intent base on ordered amount cartTotal and currency
        const paymentIntent = await stripe.paymentIntents.create({
            description: 'Software development services',
            amount: finalAmount,         //as 100 =1$
            currency: 'usd',
            payment_method_types: ['card'],
        });


        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntent,
            cartTotal,
            cartTotalAfterDiscount,
            payable: finalAmount
        })

    } catch (err) {
        console.log(err);

    }
}


