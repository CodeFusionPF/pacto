const express = require('express');
const router = express.Router();

const {postNewQuestion} = require('../controllers/question/APIPostNewQuestion');
const {postNewAnswer} = require('../controllers/question/APIPostNewAnswer');
const {getAllQuestions} = require('../controllers/question/APIGetQuestions');


router.post('/question', (req, res) => {postNewQuestion(req, res)});

router.get('/questions', (req, res) => {getAllQuestions(req, res)})

router.post('/answer', (req, res) => {postNewAnswer(req, res)})

module.exports = router;