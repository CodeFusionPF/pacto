const express = require('express');
const router = express.Router();

const {postReview} = require('../controllers/reviews/APIPostNewReview');
const {getAllVendorReviews} = require('../controllers/reviews/APIGetVendorReviews');

router.post('/review', (req, res) => {postReview(req, res)});

router.get('/vendorReviews', (req, res) => {getAllVendorReviews(req, res)})

module.exports = router;