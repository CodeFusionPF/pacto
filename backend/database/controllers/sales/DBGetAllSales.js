const Order = require("../../models/order");

const getAllSalesDB = async () => {

    try{
        const orders = Order.find()
                        .populate("users.user", ["firstname", "lastname"])
                        .populate("products.product", ["name", "price"])
                        .order('-creationdate')
                        .lean();
        console.log(orders);
        return orders;
    } catch (err){
        throw new Error (`Error al traer las ventas ${err}`);
    }
}

module.exports = getAllSalesDB;