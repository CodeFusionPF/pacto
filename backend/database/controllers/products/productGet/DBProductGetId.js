const Product = require("../../../models/product");

const DBProductGetId = async (id) => {
    try {
        const productFind = await Product.findById(id).lean()
        return productFind
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = DBProductGetId