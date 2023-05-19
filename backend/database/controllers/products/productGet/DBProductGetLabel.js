const Product = require("../../../models/product");

const DBProductGetLabel = async (label) => {
    try {
        const productsLabel = await Product.find({ label: "destacado"}).lean()
        return productsLabel
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = DBProductGetLabel