const getAllReviewsDB = require('../../database/controllers/reviews/reviewGet/DBGetAllReviews');

const getAllReviews = async (req, res) => {

    try{
        let reviews = await getAllReviewsDB();
        const amountXPage = 20;
        const {page} = req.query;

        if (reviews){
            const totalReviews = reviews.length;
            const indexLastRev = page * amountXPage;
            const indexFirstRev = indexLastRev - amountXPage;
           
            reviews = reviews.slice(indexFirstRev, indexLastRev);

            return res.status(200).json({
                totalReviews,
                reviews
            });
        }

        return res.status(404).json({msg: "Error 404! Not found"});

    } catch (err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor!"
        });
    }
}

module.exports = {getAllReviews};