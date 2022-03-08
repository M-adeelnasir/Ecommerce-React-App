const mongoose = require('mongoose')
const slugify = require('slugify')
// const { default: slugify } = require("slugify");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "Too short"],
        maxlength: [32, "Too long"]
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }

}, { timestamps: true })


//Creat each Bootcamp Slug
// pre is mongoose func it run before saving dataObject to database
categorySchema.pre('save', function (next) { //use standard function instead of using arrow func 
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = mongoose.model("Category", categorySchema)
