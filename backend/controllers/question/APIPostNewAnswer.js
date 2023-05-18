const DBQuestionReply = require('../../database/controllers/questions/questionPost/DBQuestionReply');

const postNewAnswer = async (req, res) => {

    try{

        const {idUser, answer, idQuestion} = req.body;

        if (idUser, answer, idQuestion){
            const response = await DBQuestionReply(idUser, answer, idQuestion);

            if (response){
                return res.status(200).json({
                    msg: "Respuesta publicada con exito",
                    answer: response
                });
            }

            return res.status(404).json({
                msg: "No se pudo cargar la respuesta"
            })
        }

        return res.status(401).json({msg: "Faltan datos para poder procesar la solicitud"});

    }catch (err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor!"
        });
    }

}

module.exports = {postNewAnswer};