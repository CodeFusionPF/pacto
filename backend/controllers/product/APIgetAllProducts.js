const getProductsAll = require('../../database/controllers/DBProductsGet.js')

const getAllProducts = async (req, res) =>{
  
    try{ 
        
       const products =  await getProductsAll();

       if (products){
        return res.status(200).json(products);
       }
       
       return res.status(404).json({msg: 'Error 404, not found'}) 

    } catch(err){
        res.status(500);

        return res.json({
                error : err.message,
                msg :`¡Error al traer los productos!`
        });
    };
}

module.exports = {getAllProducts}