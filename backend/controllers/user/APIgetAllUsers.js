const getAllUsers = (req, res) => {
    try{

        const users = "Aca va la función de traer todos los usuarios";

        if (users){
            return res.status(200).json({msg: 'Usuarios traidos con exito', users: users});
        }

        return res.status(404).json({msg: 'Error 404, not found '});

    } catch (err){
        return res.status(500).json({error: err, msg: 'Error en la solicitud de la base de datos'})
    }
}

module.exports = {getAllUsers}