const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/usersController')
/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// GET user by ID
router.get('/user', (req, res) => {getAllUsers(req, res)})

// POST new user
router.post('/user', (req, res) => {})



module.exports = router;
