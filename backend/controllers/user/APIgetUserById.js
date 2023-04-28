const {checkUserExists} = require('../../database/helper/DBcheckUserExists');

const getUserById = (req, res) => {

    const {id} = req.query;

    try{
        const user = getUser(id);

        if (user){
           return res.status(200).json({msg: 'Usuario traido con exito', user: user});
        } 

        return res.status(404).json({msg: 'Error 404, not found '});
    } catch(err){
        return res.status(500).json({error: err, msg: 'Error en la solicitud de la base de datos'});
    }

}

module.exports = {getUserById}