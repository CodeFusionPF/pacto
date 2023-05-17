const getAllUsersDB = require('../../database/controllers/users/userGet/DBAllUsers');

//Array que contendrá las keys que se permitiran en el json de user
//registerDate está comentado ya que todavía no existe en el schema de usuarios
const allowedKeys  = ["_id", "firstname", "lastname", "verified", "role", "state", "email" , "registrationdate" ];

const getAllUsers = async (req, res) => {
    try{
        //Recibo por query el numero de pagina para poder mostrar los usuarios correspondientes a esa pag
        const {page} = req.query;
        const amountXPage = 20;
        let users = await getAllUsersDB();

        if (users){

            //Recorro cada usuario y le saco las keys inncesarias para el admin (Codigo de recuperacion y verificacion, y la password hasheada);
            for (const user of users){

                Object.keys(user).forEach((key) => {
                    //Si la key no está incluida en el array allowedKeys, entonces la saco del json
                    if (!allowedKeys.includes(key)){
                        delete user[key];
                    }
                });
             
            }

            const totalUsers = users.length;
            const indexLastUser = page * amountXPage;
            const indexFirstUser = indexLastUser - amountXPage;

            users.slice(indexFirstUser, indexLastUser);

            return res.status(200).json({totalUsers, users});
        }

        return res.status(404).json({msg: 'Error 404, not found '});

    } catch (err){
        return res.status(500).json({error: err.message, msg: 'Error en la solicitud de la base de datos'})
    }
}

module.exports = {getAllUsers}