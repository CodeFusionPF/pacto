const getProductsAll = require('../../database/controllers/products/productGet/Handlers/handlerGetAll');
// Por crash en deploy, ajuste en nombre de ruta lìnea1

const getAllProductsAdmin = async (req, res) =>{
  
    try{ 
        
        let products =  await getProductsAll(true); //Ajuste pre-deploy: de const a let, porque en lìnea 17 se reasigna el valor de products
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