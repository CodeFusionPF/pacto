const Order = require("../../models/order");

const getSaleByIdDB = async (id) => {
    try {

        const order = await Order.findById(id)
            .populate("products.product", ["name", "state", "price", "user"])

            .lean()
        const vendor = await User.findById(order.products.product.user)
        //console.log(order.products)
        if (order === null) {
            return false
        }
        return { order, vendor }


    } catch (err) {
        throw new Error(`Error al traer la venta seleccionada ${err}`)
    }
}

module.exports = getSaleByIdDB;