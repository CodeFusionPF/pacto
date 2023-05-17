const DBReviewPost = require('../../database/controllers/reviews/reviewPost/DBReviewPost');

const postReview = async (req, res) => {

    try{

        const {idUser, review, idVendor}  = req.body;

        if (review){
            const response = await DBReviewPost(idUser, review, idVendor);

            if (response){
                return res.status(200).json({msg: "Review creada con exito!",
                                            review: response});
            }

            return res.status(404).json({msg: "No se pudo crear la review"});
        }

        return res.status(401).json({msg: "Faltan datos para poder procesar la solicitud"});

    } catch (err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor"
        });
    }
}

module.exports = {postReview}