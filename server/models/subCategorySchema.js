const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
const { ObjectId } = mongoose.Schema

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, "too Short"],
        maxlength: [20, "too long"]
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true })

subSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

module.exports = mongoose.model("Sub", subSchema)