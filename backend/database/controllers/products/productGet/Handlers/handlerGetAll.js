const Product = require("../../../../models/product");

const getProductsAll = async (admin = false) => {

  try {
    let res = await Product.find({ active: "en venta" }).lean();
    if (!admin){
      res = await Product.find({ active: "en venta" }).lean();
    } else{
      res = await Product.find().lean();
    }
    
    return res;
  } catch (err) {
    throw new Error(`Error al obtener los productos: ${err}`);
  }
};

module.exports = getProductsAll;
