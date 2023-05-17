const express = require('express');
const router = express.Router();

const {postReview} = require('../controllers/reviews/APIPostNewReview');

router.post('/review', (req, res) => {postReview(req, res)});

module.exports = router;