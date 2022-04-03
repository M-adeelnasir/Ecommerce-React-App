const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Cart = require('../models/cartSchema')
const Coupon = require('../models/couponSchema')


const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

exports.createStripIntent = async (req, res) => {

    try {
        //later Apply Coupon
        //later apply price

        //get user 
        const user = await User.findOne({ email: req.user.email }).exec()
        console.log(user);

        //get the total ammount
        const { cartTotal } = await Cart.findOne({ OrderBy: user._id }).exec()


        //create a payment intent base on ordered amount cartTotal and currency
        const paymentIntent = await stripe.paymentIntents.create({
            description: 'Software development services',
            amount: cartTotal * 100,         //as 100 =1$
            currency: 'usd',
            payment_method_types: ['card'],
        });


        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntent
        })

    } catch (err) {
        console.log(err);

    }
}


