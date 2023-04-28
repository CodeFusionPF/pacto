const Product = require("../../../models/product");

const getProductsAll = async () => {

  try {
    const res = await Product.find().lean();
    return res;
  } catch (err) {
    throw new Error(`Error al obtener los productos: ${err}`);
  }
};

module.exports = getProductsAll;
