
const shoppingCart = async (req, res) => {
  try {
    const {token, products} = req.body 
    const user = req.userId

    res.status(200).json("request shoppingCart sucess")


  } catch (e) {


  }
};

module.exports = shoppingCart;
