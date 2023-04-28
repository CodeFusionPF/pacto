const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/user/APIgetAllUsers')
const {postNewUser} = require('../controllers/user/APIpostNewUser')
/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// GET all users
router.get('/users', (req, res) => {getAllUsers(req, res)})

// POST new user
router.post('/user', (req, res) => {postNewUser(req, res)})



module.exports = router;
