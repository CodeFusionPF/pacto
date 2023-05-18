const getProductsAll = require('../../database/controllers/products/productGet/Handlers/handlerGetAll');
// Por crash en servidor, ajuste en nombre de ruta lìnea1

const getAllProductsAdmin = async (req, res) =>{
  
    try{ 
        
        const products =  await getProductsAll(true);
        const {page} = req.query;
        const amountXPage = 20;

        if (products){
            const totalProducts = products.length;
            const indexLastProd = page * amountXPage;
            const indexFirstProd = indexLastProd - amountXPage;

            products = products.slice(indexFirstProd, indexLastProd);
            
            return res.status(200).json({
                totalProducts,
                products
            });
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

module.exports = {getAllProductsAdmin}