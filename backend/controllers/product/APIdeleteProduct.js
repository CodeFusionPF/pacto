const deleteProduct = require('../../database/controllers/DBProductDelete');

const deleteProductById = async (req, res) =>{
    try{
        const id = req.query.id;
        
        if (id){
            const product = await deleteProduct(id)

            if (product){
                return res.status(200).json({msg : "Producto eliminado con exito"});
            }

            return res.status(204).json({msg : "Procesada con exito pero no fue posible eliminar el producto "});
            
        }

        return res.status(404).json({msg : "Error 404, not found"})
    } catch (err){
        return res.status(500).json({error: err.message, msg: "Error al eliminar el producto"});
    }
}

module.exports = {deleteProductById}