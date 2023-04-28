const getProductId = require('../../database/controllers/DBProductGetId');

const getProductById = async (req, res) => {
    try{
        const id = req.query.id;

        if (id){
            const product = await getProductId(id);

            return res.status(200).json(product);
        }

        return res.status(404).json({msg: "Error 404, not found"})
    } catch (err){
        return res.status(500).json({error: err.message, msg: "Error al traer el producto"})
    }
}

module.exports = {getProductById}