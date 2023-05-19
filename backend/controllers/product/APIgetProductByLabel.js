const DBProductGetLabel = require("../../database/controllers/products/productGet/DBProductGetLabel");

const getProductByLabel = async (req, res) => {
  try {
    
    const label = req.query.label;
    console.log(label);

    if (label) {
      const product = await DBProductGetLabel(label);

      return res.status(200).json(product);
    }

    return res.status(404).json({ msg: "Error 404, not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, msg: "Error al traer producto" });
  }
};

module.exports = getProductByLabel;
