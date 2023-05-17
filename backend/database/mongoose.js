const mongoose = require("mongoose");

const { createMainCategories, Category } = require("./models/category");
const { userTest, productTest, QuestionTest, departmentsTest, rolesTest } = require("./mockData/testData");
const User = require("./models/user");
const Product = require("./models/product");
const Review = require("./models/review");
const Question = require("./models/question");
const Department = require("./models/department");
const City = require("./models/city");
const Role = require("./models/role");
const Wallet = require("./models/wallet");
require("dotenv").config()
const cron = require('node-cron');
const logAdminPostDay = require("./controllers/admin/logAdminPostDay");
const LogAdmin = require("./models/logadmin");
const logBalanceToday = require("./controllers/admin/handlers/logBalanceToday");
const DBShoppingCartAddProduct = require("./controllers/transactions/shoppingcart/DBShoppingCartAddProduct");
const DBPurchasedProducts = require("./controllers/transactions/DBPurchasedProducts");
const DBStateGetOrder = require("./controllers/transactions/DBStateGetOrder");
const getSaleByIdDB = require("./controllers/sales/DBGetSaleById");

// REVISAR ARCHIVO ENV EN DRIVE PARA TENER CREDENCIALES DE ACCESO 
const { MONGO_DB_URI } = process.env
//mongoose.connect(MONGO_DB_URI);
mongoose.connect("mongodb://127.0.0.1:27017/marketplace")

mongoose.connection.on("open", (_) => {
  console.log("Database is connected to Atlas");
});

mongoose.connection.on("error", (error) => {
  console.log('Error connection: ', error);
});
cron.schedule('0 0 * * *', () => {
  logAdminPostDay()
});



const load = async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Review.deleteMany();
  await Question.deleteMany();
  await Role.deleteMany();
  await Wallet.deleteMany()
  //await LogAdmin.deleteMany()
  //await City.deleteMany();
  //await Department.deleteMany();

  //await departmentsTest();
  await rolesTest();
  await userTest();
  await createMainCategories();
  await productTest();
  await QuestionTest()

};
//const Data = new LogAdmin()
//Data.save()
//load();
//logBalanceToday()

const user = "6463aad67414c82d6e56b92d"
const product = "6463aad67414c82d6e56ba13"
//DBStateGetOrder(user)
getSaleByIdDB("6463aca52574df0babfb81f4")
//DBShoppingCartAddProduct(user, product, 1)
//DBPurchasedProducts(user)
//DBStateSetOrderByClient(user)
module.exports = mongoose.connection;
