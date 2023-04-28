const mongoose = require("mongoose");

const { createMainCategories } = require("./models/category");
const DBProductGetCategory = require("./controllers/products/productGet/DBProductGetCategory");



mongoose.connect('mongodb://127.0.0.1:27017/marketplace');

createMainCategories()

// const newProduct = new Product(
//    {
//         name: "Ps5",
//         image: "none",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         state: "Bueno",
//         price: 7000,
//         active: true,
//          label: "Sony",
//     stock: 6000,    })

// newProduct.save()

module.exports = mongoose.connection