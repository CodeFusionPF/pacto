const Product = require("../../../models/product");

const DBProductGetName = async (name) => {
    try {
        const productName = await Product.find({ name: { $regex: `/${name}/`, $options: 'i' } }).lean()
        return productName
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = DBProductGetName