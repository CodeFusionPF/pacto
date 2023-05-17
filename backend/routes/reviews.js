const express = require('express');
const router = express.Router();

const {postReview} = require('../controllers/reviews/APIPostNewReview');
const {getAllVendorReviews} = require('../controllers/reviews/APIGetVendorReviews');
const {getAllReviews} = require('../controllers/reviews/APIGetAllReviews');

//ruta para postear una review
router.post('/review', (req, res) => {postReview(req, res)});

//ruta para obtener todas las reviews en la db
router.get('/reviews', (req, res) => {getAllReviews(req, res)});

//ruta para obtener todas las reviews correspondientes a un vendedor
router.get('/vendorReviews', (req, res) => {getAllVendorReviews(req, res)})

module.exports = router;