const Product = require("../../../models/product");
const DBProductGetCategory = require('../productGet/handlers/DBProductGetCategory');
const getProductsAll = require("./handlers/handlerGetAll");
const handlerFilters = require('./handlers/handlerFilters.js')

//filters = {price: {min: 20, max: 100}, categorias:{categoria: audio, subcategoria: audifonos} , status: [bueno, muy bueno]}

const DBProductsFilters = async (filters) => {
    try {
        let response = {}

        switch (true) {
           
            case (filters.price === null && filters.categories === null && filters.status === null):
           
                response = await getProductsAll()
                break

            /*
            case (filters.categories !== null):
                if (filters.price === null && filters.status === null) {
                    response = await DBProductGetCategory(filters.categories.category, filters.categories.subcategory)
                } else {

                response = await handlerFilters(filters)
                
                break*/

            default:
                response = await handlerFilters(filters)
        }
     
        return response

    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = DBProductsFilters