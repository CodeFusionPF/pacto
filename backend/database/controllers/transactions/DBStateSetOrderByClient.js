const { default: mongoose } = require("mongoose");
const Product = require("../../models/product");
const User = require("../../models/user");
const Order = require("../../models/order");
const DBSetBalance = require("./DBSetBalance");

mongoose.Types.ObjectId
const DBStateSetOrderByClient = async (idOrder, idProduct) => {

    try {
        const setOrder = await Order.findOne(
            { _id: idOrder },
        ).populate("products.product", ["price", "user"]);
        for (let element of setOrder.products) {
            if (element.product._id.equals(idProduct)) {
                element.state = "entregado"
                const total = element.product.price * element.ammount
                DBSetBalance(element.product.user, total, "receivable")
            }
        }
        if (setOrder.products.some(element => element.state === "entregado")) {
            setOrder.state = "finalizada"
        }
        await setOrder.save()
        return setOrder
    } catch (error) {
        console.log(error)
    }


}

module.exports = DBStateSetOrderByClient