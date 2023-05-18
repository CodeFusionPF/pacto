const getAllProductQuestions = require('../../database/controllers/questions/questionGet/DBGetQuestions');

const getAllQuestions = async (req, res) => {
    
    try{

        const {id, page} = req.query;

        if (id && page){
            const questions = await getAllProductQuestions(id);
            const amountXPage = 10;

            if (questions){
                const totalQuestions = questions.length;
                const indexLastQues = page * amountXPage;
                const indexFirstQues = indexLastQues - amountXPage;
    
                response = questions.slice(indexFirstQues, indexLastQues);

                return res.status(200).json({
                    totalQuestions,
                    questions: response
                })
            }   

            return res.status(404).json({msg: "Error 404! Not found"});
        }

        return res.status(401).json({msg: "Faltan datos para poder procesar la solicitud"});
    } catch (err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor!"
        })
    }
}

module.exports = {getAllQuestions};