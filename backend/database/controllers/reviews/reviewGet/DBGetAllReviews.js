const Review = require('../../../models/review');

const getAllReviewsDB = async () => {
    try{

        const reviews = await Review.find().sort('-postdate').lean();

        return reviews;
    } catch (err){
        throw new Error (`Error al obtener las reseñas ${err}`)
    }
}

module.exports = getAllReviewsDB;