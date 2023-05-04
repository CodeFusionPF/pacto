const mongoose = require("mongoose");

const { createMainCategories, Category } = require("./models/category");
const DBProductGetCategory = require("./controllers/products/productGet/handlers/DBProductGetCategory");
const { userTest, productTest } = require("./mockData/testData");
const User = require("./models/user");
const Product = require("./models/product");
const DBUserValidate = require("./controllers/users/userPost/DBUserValidate");

const uri = "mongodb://127.0.0.1:27017/marketplace";

mongoose.connect(uri);

mongoose.connection.on("open", (_) => {
  console.log("Database is connected to => ", uri);
});

mongoose.connection.on("error", (error) => {
  console.log('Error connection: ', error);
});

const load = async () => {
  await User.deleteMany()
  await Category.deleteMany()
  await Product.deleteMany()
  await userTest();
  await createMainCategories();
  await productTest();
};

DBUserValidate("Gaby_98@hotmail.com.ar")
//load();

module.exports = mongoose.connection;
