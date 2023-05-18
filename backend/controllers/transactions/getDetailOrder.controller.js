const getSaleByIdDB = require("../../database/controllers/sales/DBGetSaleById");

const getDetailOrder = async (req, res) => {
    const { id }  = req.params;

    try{
        if(id){
        console.log(id)
        const  order = await getSaleByIdDB(id);
        const productsOrder =  [order];

        return res.status(200).json(productsOrder);
        }

        return res.status(407).json('no se encontraron productos')

    }catch(error){
        console.log(error.message)
        res.status(400).json({msg:error.message});
    }

};

module.exports = getDetailOrder;
