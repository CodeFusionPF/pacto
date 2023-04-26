const { Schema } = require("mongoose")

const productSchema = new Schema({
    name: String,
    image: String,
    description: String,
    state: Boolean,
    price: Float64Array,
    active: Boolean,
    label: String,
    stock: Float64Array,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    //send: { type: Schema.Types.ObjectId, ref: "Send" },
    //category: { type: Schema.Types.ObjectId, ref: "Category" },
    //questions: { type: Schema.Types.ObjectId, ref: "Question" },
    //reviews: { type: Schema.Types.ObjectId, ref: "Review" },

})

module.exports = productSchema