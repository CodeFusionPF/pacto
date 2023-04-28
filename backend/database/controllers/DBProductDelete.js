const Product = require("../models/product");

const deleteProduct = async (idProduct) => {
  const porductUpdate = await Product.update({ _id: idProduct }, { active: false });

  return porductUpdate;
};

module.exports = deleteProduct;