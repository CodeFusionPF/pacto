const User = require("../models/user")

//Funcion para verificar si el usuario existe en la base de datos
/* Se agregó el parametro lean t/f ya que en algunos casos del proyecto se necesita que se retorne 
un json plano (lean true) y en otro que retorne el json con las funciones de mongoose (lean false)*/
const checkUserExists = async (idUser, email = false, lean = false) => {

    try {
        let isUser = null;
        if (email) {
            
            isUser = User.findOne({ email: email });
          
        } else {
            
            isUser = User.findById(idUser);
    
        }
    
        if (isUser != null) {
    
            isUser = isUser.populate('role', 'role')
            .populate('city', 'city')
            .populate({
                path: 'city',
                populate: {
                    path: 'department',
                    select: 'department -_id'
                    // Selecciona el campo 'department' del departamento
                }
            })
            .populate('shoppingCart.products.product', '-__v')

            if (lean){
               
                isUser.lean();
            }
    
            isUser = await isUser
    
            return isUser
        }
    
       
    
        return false;

    } catch (err){
        return false;
    }
    
}



module.exports = checkUserExists

