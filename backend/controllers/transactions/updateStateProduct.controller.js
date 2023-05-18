const DBStateSetOrderByClient =  require("../../database/controllers/transactions/DBStateSetOrderByClient")
const getSaleByIdDB = require("../../database/controllers/sales/DBGetSaleById")

const updateStateProduct = async (req, res) => {
    const { id, product}  = req.params;

    try{
        if(id && product){
            
            await DBStateSetOrderByClient(id,product);
            const  order = await getSaleByIdDB(id);
            const productsOrder =  [order];
            res.status(200).json(productsOrder);
        }

       
    }catch(error){
        res.status(400).json({msg:error.message})
    }

};

module.exports = updateStateProduct;
