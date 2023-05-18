const Question = require('../../../models/question');

const getAllProductQuestions = async (idProduct) => {

    try{
        const questions = await Question.find().where({product: idProduct})
                                .populate("answer", "-_v")
                                .lean();
     
        return questions;
    } catch (err){
        throw new Error(`Error al obtener las preguntas y respuestas ${err}`);
    }
}

module.exports = getAllProductQuestions;