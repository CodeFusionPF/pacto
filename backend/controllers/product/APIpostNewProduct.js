const productSave = require('../../database/controllers/DBProductSave');
const checkUserExists = require('../../database/helper/DBcheckUserExists');

const postNewProduct = async (req, res) => {

    try{
        //En el req.body debo recibir un json con las propiedades iduser y product
        const {idUser, product} = req.body;

        if (idUser && product){
            const newProd = await productSave(product, idUser);

            //Checkeo que el producto fue creado en la db
            if (checkUserExists(newProd.id)){
                return res.status(200).json(newProd);
            }

            return res.status(404).json({msg: "No se pudo cargar el nuevo producto, intentlo de nuevo"});
        }
    } catch (err){
        return res.status(500).json({error: err.message, msg: "Error al cargar el producto"});
    }

    
}

module.exports = {postNewProduct}