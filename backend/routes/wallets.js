const express = require('express');
const router = express.Router();

const {getWallets} = require('../controllers/wallets/APIGetWallets');
const {checkIsAdmin} = require('../middlewares/checkAdminMiddleware');

router.get('/wallets', (req, res) => {getWallets(req, res)});

module.exports = router;