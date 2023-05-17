const checkUserExists = require('../../database/helper/DBcheckUserExists');


const allowedKeys  = ["goodcalification", "neutralcalification", "badcalification"];

const getUserRating = async (req, res) => {

    try{

        const {id} = req.query;

        if (id){
            const user = await checkUserExists(id, false , true);

            if (user){
                
                Object.keys(user).forEach((key) => {
                     //Si la key no está incluida en el array allowedKeys, entonces la saco del json
                    if (!allowedKeys.includes(key)){
                        delete user[key];
                    }
                });

                return res.status(200).json(user);
                 
            }

            return res.status(404).json({msg: "Error 404! Not found"});
        }
       
        return res.status(401).json({msg: "Faltan datos para poder procesar la solicitud"});

    } catch(err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor!"
        });
    }
}

module.exports = {getUserRating}