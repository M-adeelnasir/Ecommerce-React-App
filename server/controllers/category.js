const Category = require('../models/categoriesSchema')
const slugify = require('slugify')
const Sub = require('../models/subCategorySchema')
const Product = require('../models/productSchema')

//@create Category

exports.create = async (req, res) => {

    try {

        const category = await Category.create(req.body)
        console.log(category);
        res.status(200).json({
            success: true,
            data: category
        })

    } catch (err) {
        console.log(err);

        if (err.code == 11000) {
            const message = `Dublicate Field Enter at index ${err.index}`
            res.status(400).json({
                success: false,
                data: message
            })
        } else {
            res.status(401).json({
                success: false,
                data: {}
            })
        }

    }
}

//@Read the subcategories
exports.read = async (req, res) => {

    try {
        let category = await Category.findOne({ slug: req.params.slug })
        if (!category) {
            res.status(404).json({
                success: flase,
                data: {}
            })
        }
        // console.log(category);
        //lets send the products retaled to this category
        const products = await Product.find({ category })
            .populate('category')
            .populate('ratings')
            .exec()



        res.status(200).json({
            success: true,
            data: category,
            products
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }
}

//@update Categories
exports.update = async (req, res) => {
    const { name } = req.body
    try {
        const category = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true, runValidators: true })
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }



}

//@remove categories
exports.remove = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ slug: req.params.slug })
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
//@list of all gategories
exports.list = async (req, res) => {
    try {
        const category = await Category.find({}).sort({ createdAt: -1 })
        console.log(category);
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    }
}


exports.getSub = async (req, res) => {
    try {
        const sub = await Sub.find({ parent: req.params._id })
        console.log(sub);
        res.status(200).json({
            success: true,
            data: sub
        })
    } catch (err) {
        console.log(sub);
        res.status(404).json({
            success: false,
            data: {}
        })
    }
}



//handleQuery search upon text

const handelQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
        .populate('category')
        .populate('subs')
        .populate('ratings')
        .exec()
    res.json({
        success: true,
        data: products
    })
}

//Searches the products

exports.searchFilters = async (req, res) => {
    const { query } = req.body
    //search base upon text
    if (query) {
        console.log("Query  :", query);
        await handelQuery();
    }
}