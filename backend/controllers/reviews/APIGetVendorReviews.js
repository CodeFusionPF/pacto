const DBReviewGetAllFromVendor = require('../../database/controllers/reviews/reviewGet/DBReviewGetAllFromVendor');

const getAllVendorReviews = async (req, res) => {
    try{
        const {id, page} = req.query;

        const amountXPage = 30;

        if(id){
            let reviews = await DBReviewGetAllFromVendor(id);
           

            if (reviews){   
                const totalReviews = reviews.reviewReceived.length;
                const indexLastRev = page * amountXPage;
                const indexFirstRev = indexLastRev - amountXPage;
               
                reviews = reviews.reviewReceived.slice(indexFirstRev, indexLastRev);

                return res.status(200).json({
                    totalReviews,
                    reviews
                })
            }

            return res.status(404).json({msg: "Error 404! Not found"});
        }

        return res.status(401).json({msg: "Faltan datos para poder procesar la solicitud"});
        
    } catch (err){
        return res.status(500).json({error: err.message,
                                    msg: "Error de conexión en el servidor"});
    }
}

module.exports = {getAllVendorReviews}