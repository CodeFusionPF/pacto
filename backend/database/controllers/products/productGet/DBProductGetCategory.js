const { Category } = require("../../../models/category");
const Product = require("../../../models/product");

const DBProductGetCategory = async (maincategory, subcategory) => {
    try {

        const subcategories = await Category.findOne({ name: maincategory, subCategories: { $elemMatch: { name: subcategory } } }, { "subCategories.$": 1 })
            .populate("subCategories.products")
            .lean()
        return subcategories

    } catch (error) {
        throw Error(error.message)
    }
}
module.exports = DBProductGetCategory