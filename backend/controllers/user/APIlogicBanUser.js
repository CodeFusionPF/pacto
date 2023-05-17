const checkUserExists = require("../../database/helper/DBcheckUserExists");

const logicBanUser = async (req, res) => {
    try{    
        //Acorder a la descripcion de Jira, desde el front solo recibo el ID del user
        //Los cambios del estado del user se establece full desde el back
        const {id} = req.body;

        const user = await checkUserExists(id);

        if (user){

            if (user.state === "activo" || user.state === "desactivado") {
                user.state = "bloqueado";
            } else {
                user.state = "activo";
            }


           
            user.save();

            return res.status(200).json({newState: user.state,
                                        msg: "Estado modificado con exito"});
        }

        return res.status(404).json({msg: "Error 404! not found"})

    } catch(err){
        return res.status(500).json({error: err.message,
                                    msg: "Error 500 problemas de conexión!"})
    }
}

module.exports = {logicBanUser}