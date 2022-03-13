const Product = require('../models/productSchema');
const slugify = require('slugify')


//create product
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const product = await Product.create(req.body)
        console.log(product);
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (err) {

        if (err.code == 11000) {
            const message = `Dublicate Field Enter at index ${err.index}`
            res.status(400).json({
                success: false,
                data: message
            })
        }
        console.log(err);
        res.status(400).json({
            success: false,
            data: {}
        })
    }
}

//get all products(list)

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: false,
            data: products
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            data: {}
        })
    }
}