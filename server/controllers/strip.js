const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Cart = require('../models/cartSchema')
const Coupon = require('../models/couponSchema')


const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

exports.createStripIntent = async (req, res) => {

    try {
        //later Apply Coupon
        //later apply price

        const paymentIntent = await stripe.paymentIntents.create({
            description: 'Software development services',
            amount: 100,
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


