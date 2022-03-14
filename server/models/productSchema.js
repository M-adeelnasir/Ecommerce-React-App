const mongoose = require('mongoose')
const slugify = require("slugify");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, "Product should have a tittle"],
        maxlength: [32, "Too long"],
        text: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [200, "too long"],
        text: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    subs: [{
        type: ObjectId,
        ref: "Sub"
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    // images: {
    //     type: Array
    // },
    shipping: {
        type: String,
        enum: ["Yes", "No"]
    },
    color: {
        type: String,
        enum: ["Black", "White", "Silver", "Grey", "Blue"]
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Hp", "Lenovo", "Asus"]
    },
    // rating: [{
    //     type: Number,
    //     postedBy: { type: ObjectId, ref: "User" }
    // }]

}, { timestamps: true });

productSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
});


module.exports = mongoose.model("Product", productSchema)