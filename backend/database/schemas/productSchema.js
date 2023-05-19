const { Schema } = require("mongoose")

const productSchema = new Schema({
    name: String,
    images: [{ type: String }],
    description: String,
    state: {
        type: String,
        enum: ['Nuevo', 'Usado', 'Reacondicionado']
        // enum: ['Nuevo (en caja original)', 'Como nuevo', 'Muy bueno', 'Bueno', 'Regular', 'Malo', 'Para piezas']
    },
    price: Number,
    active: {
        type: String,
        enum: ["en venta", "agotado", "bloqueado", "desactivado"],
        default: "en venta"
    },
    label: {
        type: String,
        enum: ["destacado", "oferta", "ninguno"]
    },
    Brand: String,
    stock: Number,
    category: String,
    subcategory: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    purchasedBy: [{ user: { type: Schema.Types.ObjectId, ref: "User" }, ammount: Number }],
    //send: { type: Schema.Types.ObjectId, ref: "Send" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    publicationdate: Date

}, { versionKey: false })



module.exports = productSchema