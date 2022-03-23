const Sub = require('../models/subCategorySchema')
const slugify = require('slugify')
const Product = require('../models/productSchema')

//create
exports.create = async (req, res) => {
    try {
        const sub = await Sub.create(req.body)
        console.log(sub);
        res.status(200).json({
            success: true,
            data: sub
        })
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            const message = `Duplicate field Enter At in index ${err.index}`
            res.status(400).json({
                success: false,
                data: message
            })
        }
        res.status(401).json({
            success: false,
            data: {}
        })
    }

}

//read a sub
exports.read = async (req, res) => {
    try {
        const sub = await Sub.findOne({ slug: req.params.slug })
        if (!sub) {
            res.status(404).json({
                success: flase,
                data: {}
            })
            return
        }

        //get the product based upon subs categories
        const product = await Product.find({ subs: sub })
            .populate('category')
            .exec()


        // console.log(category);
        res.status(200).json({
            success: true,
            data: sub,
            product

        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }
}


//update Sub cayegory
exports.update = async (req, res) => {
    try {
        const { name, parent } = req.body
        const sub = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, parent, slug: slugify(name) }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: sub
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }

}

//delete sub
exports.remove = async (req, res) => {
    try {
        const sub = await Sub.findOneAndRemove({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }
}


//list of all sub
exports.list = async (req, res) => {
    try {
        const subs = await Sub.find({}).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            data: subs
        })

    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }
}