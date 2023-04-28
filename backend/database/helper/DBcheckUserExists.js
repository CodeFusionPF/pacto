const { User } = require("../mongoose")

//Funcion para verificar si el usuario existe en la base de datos

const checkUserExists = async (idUser) => {
    const isUser = await User.findById(idUser)
    if (idUser !== null) {
        return true
    }
    else return false
}



module.exports = checkUserExists

