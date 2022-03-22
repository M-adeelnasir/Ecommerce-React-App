const Product = require('../models/productSchema');
const slugify = require('slugify')
const User = require('../models/userSchema')


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

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .limit(parseInt(req.params.count))
            .populate("category")
            .populate("subs")
            .sort([["createdAt", "desc"]])
            .exec();

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

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndRemove(req.params.slug).exec()
        res.json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            data: "Product failed to delete"
        })
    }
}

exports.read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .populate('category')
            .populate('subs')
            .exec()
        res.json({
            success: true,
            data: product
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            data: "Product get to failed"
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }

        const product = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, runValidators: true })
        res.json({
            success: true,
            data: product
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            data: "Product Update to failed"
        })
    }
}


//withOut pagination
// exports.list = async (req, res) => {
//     try {
//         //get product {createdAt, assen/desc, limit of products}
//         const { sort, order, limit } = req.body;
//         const products = await Product.find({})
//             .populate('category')
//             .populate('subs')
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec()

//         res.json({
//             success: true,
//             data: products
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             success: false,
//             data: "Product get to failed"
//         })
//     }
// }


//with pagination

exports.list = async (req, res) => {
    try {

        const { sort, order, page } = req.body;

        const currentPage = page || 1;
        const perPage = 3

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(perPage)
            .exec()

        res.json({
            success: true,
            data: products
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: "Product get to failed"
        })
    }
}

exports.getProductsCount = async (req, res) => {
    const total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total)
}


//Ratings
exports.productStar = async (req, res) => {
    // 1- get the product
    const product = await Product.findById(req.params.productId).exec()
    // 2- get the user who want to leave rating
    const user = await User.findOne({ email: req.user.email }).exec()

    const { star } = req.body
    //who is updating
    //check if the currently logged in user already added rating to the product
    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    )

    console.log(existingRatingObject);
    //if user have not left ratings yet, then push it
    //if not rating existingRatingObject will return undefined
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(product._id,
            {
                $push: { ratings: { star, postedBy: user._id } }
            },
            { new: true }
        ).exec() //can also use req.params.productId

        console.log(ratingAdded);
        res.json({
            success: true,
            data: ratingAdded
        })

    }
    //if the user already left the rating then update the rating
    else {
        console.log("heelo");
        const updateRating = await Product.updateOne(
            {
                ratings: {
                    $elemMatch: existingRatingObject
                }
            },
            {
                $set: { "ratings.$.star": star }
            },
            { new: true }
        ).exec()
        console.log(updateRating);
        res.json({
            success: true,
            data: updateRating
        })
    }
}



exports.listRelatedProducts = async (req, res) => {
    try {
        //get the product
        const product = await Product.findById(req.params.productId)
        //sub product base upon that product category
        const related = await Product.find({
            _id: { $ne: product._id }, //will neglect($ne) the parent product and find the product of its category
            category: product.category
        })
            .limit(3)
            .populate('category')
            .populate('subs')
            .populate('ratings')
            .exec()
        res.json({
            success: true,
            data: related
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: err.message
        })
    }



}