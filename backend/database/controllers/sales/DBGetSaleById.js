const Order = require("../../models/order");
const User = require("../../models/user");

const getSaleByIdDB = async (id) => {
    try {

        const order = await Order.findById(id)
        .populate([ 
            "user", 
            {
            path: 'products.product',
            select: ['name', 'state', 'price'],
            populate: {
              path: 'user',
              select: ['firstname', 'lastname', 'email']
            }
          }])

            .lean()
        // const vendor = await User.findById(order.products.product.user)
        // //console.log(order.products)
        if (order === null) {
            return false
        }
        return order;


    } catch (err) {
        throw new Error(`Error al traer la venta seleccionada ${err}`)
    }
}

module.exports = getSaleByIdDB;