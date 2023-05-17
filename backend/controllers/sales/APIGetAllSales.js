const getAllSalesDB = require('../../database/controllers/sales/DBGetAllSales');

const getAllSales = async (req, res) => {

    try{
        const {page} = req.query;

        const sales = await getAllSalesDB();
        const totalOrders = sales.length;
        const amountXPage = 20;

        if (sales){

            const indexLastOrder = page * amountXPage;
            const indexFirstOrder = indexLastOrder - amountXPage;
            sales = sales.slice(indexFirstOrder, indexLastOrder);
            
            return res.status(200).json({
                totalOrders,
                ordersList: sales
            });
        }

        return res.status(404).json({
            msg: "Error 404! Not found"
        })
    } catch (err){
        return res.status(500).json({error: err.message,
                                    msg: "Problemas de conexión en el servidor!"});
    }
}

module.exports = {getAllSales};