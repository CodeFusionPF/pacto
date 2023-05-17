const { Schema } = require("mongoose");
const Review = require("../../../models/review");
const User = require("../../../models/user");
const CheckAverageCalification = require("../../../helper/DBCheckAverageCalification");
const LogAdminController = require("../../admin/LogAdminController");


const DBReviewPost = async (idUser, review, idVendor) => {
    try {

        const newReview = new Review(review)
        const updateUser = await User.findByIdAndUpdate(idUser, { $push: { reviewPost: newReview._id } }, { returnDocument: "after" })
        newReview.client = idUser
        newReview.vendor = idVendor
        LogAdminController(newReview._id, null, "reviews")
        newReview.postdate = new Date()
        const response = await newReview.save()
    
        const updateVendor = await User.findByIdAndUpdate(idVendor, { $push: { reviewReceived: newReview._id } }, { returnDocument: "after" })
        if (newReview.calification === 1) {
            updateVendor.badcalification += 1
        }
        else if (newReview.calification === 2) {
            updateVendor.neutralcalification += 1
        }
        else if (newReview.calification === 3) {
            updateVendor.goodcalification += 1
        }
        await updateVendor.save();

   
        return response
    } catch (error) {
        throw Error(error)
    }
}

module.exports = DBReviewPost