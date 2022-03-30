const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Cart = require('../models/cartSchema')
const Coupon = require('../models/couponSchema')


exports.userCart = async (req, res) => {

    const { cart } = req.body;

    let products = [];
    //get the user to store the orderBy which user
    const user = await User.findOne({ email: req.user.email }).exec();

    //check if the cart with the logged in user id already exists
    const cartExistsByThisUser = await Cart.findOne({ orderBy: user._id }).exec();

    if (cartExistsByThisUser) {
        cartExistsByThisUser.remove();
        console.log("Old Cart Removed");
    }

    //push each cart in products array
    for (let i = 0; i < cart.length; i++) {
        let object = {}

        //push each field in object
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        //get the price from server because may be user can try to change in localstorage
        let { price } = await Product.findById(cart[i]._id).select('price').exec()
        object.price = price;

        //push each object to products array
        products.push(object)

        // console.log("Product single Cart ===>",object);
    }

    // console.log("Products ====>",products);

    //calculate the price on server because may be user can try to change in localstorage
    let cartTotal = 0
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count

    }

    // console.log("cart Total ==>",cartTotal);


    const newCart = await new Cart({
        products,
        cartTotal,
        orderBy: user._id,

    }).save()

    console.log("Cart ====>", newCart);

    // Print("Abdullah's error")

    res.json({
        success: true,
        data: newCart
    })

}



//get the cart

exports.getCart = async (req, res) => {

    //get ther user
    const user = await User.findOne({ email: req.user.email }).exec()

    let cart = await Cart.findOne({ orderBy: user._id })
        .populate('products.product', "_id title price cartTotalAfterDiscount cartTotal")
        .exec()

    console.log("Cart get from server ==> ", cart);
    res.json({
        success: true,
        data: cart
    })

}


//remove the cart
exports.removeCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).exec()

        //remove the cart
        const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec()
        res.json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.json({
            success: false
        })
    }
}


// send address to backend
exports.sendAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate({ email: req.user.email }, { address: req.body.address }).exec()

    res.json({
        success: true,
        data: userAddress
    })
}


//apply coupon
exports.applyCoupon = async (req, res) => {
    const { coupon } = req.body
    //get the coupon
    const validCoupon = await Coupon.findOne({ name: coupon }).exec()
    //if the coupon is invalid
    if (validCoupon === null) {
        return res.status(404).json({
            success: false,
            data: "Invalid Coupon Code"
        })
    }

    //get ther so we can get the cart base on user saved 
    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderBy: user._id })
        .populate('products.product', '_id title price')
        .exec()

    // console.log("cartTotal", cartTotal,"cartTotalAfterDiscount",validCoupon.discount);
    //let save the cartTotalAfterDiscount in cart schema
    let cartTotalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100)
        .toFixed(2)  //9.99 (two values)

    await Cart.findOneAndUpdate({ orderBy: user._id }, { cartTotalAfterDiscount }, { new: true, runValidators: true }).exec()

    res.json({
        success: true,
        data: cartTotalAfterDiscount
    })

}