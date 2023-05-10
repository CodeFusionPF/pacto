const checkUserExists = require('../../database/helper/DBcheckUserExists');
//Requiero jwt ya que cuando un usuario vuelva a loggear de forma "manual", se le asignará un nuevo token por seguridad
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DBUserVerified = require('../../database/controllers/users/userPost/DBUserVerified');

function generateNewtoken(userId){
    return jwt.sign({userId: userId}, process.env.JWT_PRIVATE_KEY /*, { expiresIn: '1h' }*/);
}

const login = async (req, res) =>{

    try{
 
        if (!req.user){
            const {email, password} = req.body;

            if (email && password){
                const user = await checkUserExists(null, email);
                //Verifico que el usuario ingresado exista en la db
                if (user){

                    let token = '';

                    //Si el usuario existe Y está verificado, entonces comprueba las coincidencias de las password para loggear o no.
                    //En caso de que no esté verificado, retornará un status 401 transmitiendo el mensaje y con un atributo "verified" en false.
                    //De esta forma el front end deberia redirigir a la ventana de verificar codigo.
                    if (user.verified){

                        //Checkeo si la contraseña ingresada coincide con la almacenada en la db
                        if (await bcrypt.compare(password, user.password)){
                          
                             /*Genero el token asociado al id del usuario, dejo comentado el tiempo de expiracion del token 
                            (Por tema de seguridad deberia estar activado pero tenemos que determinar el tiempo que pondremos para que expire)*/
                            token = generateNewtoken(user._id);
                        
                            return res.status(200).json({msg: "Inicio de sesión exitoso",
                                                    verified: true,
                                                    token: token});
                        }

                        /** En caso de que la contraseña no coincida, al usuario NO se le generará un nuevo token */

                        return res.status(401).json({msg: "La contraseña ingresada no coincide!"});
                    }
                    
                    token = generateNewtoken(user._id);
                    const codeSend = await DBUserVerified(user.email);

                    return res.status(401).json({msg: "Credenciales del usuario validas pero no esta verificado!",
                                                verified: false,
                                                codeSend: codeSend,
                                                token: token})
                    
                }

                return res.status(401).json({msg: "El usuario ingresado no existe!"});
            } else{
                return res.status(400).json({msg: "Bad request! Faltan datos para procesar el login!"});
            }

        }

        return res.status(200).json({msg: "Inicio de sesión exitoso",
                                    verified: true,
                                    user: req.user});

    }catch(err){
        return res.status(500).json({error: err.message,
                                    msg: 'Error 500! Problemas internos con la conexión del servidor.'})
    }
}



module.exports = {login}