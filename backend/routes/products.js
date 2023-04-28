const express = require('express');
const router = express.Router();
const {getAllProducts} = require('../controllers/product/APIgetAllProducts')
const {getProductById} = require('../controllers/product/APIgetProductById');
const {deleteProductById} = require('../controllers/product/APIdeleteProduct');
const {postNewProduct} = require('../controllers/product/APIpostNewProduct');

// GET all products
router.get('/products', (req, res, next) => getAllProducts(req, res))

//GET Product by id
router.get('/product', (req, res, next) => getProductById(req, res));

//DELETE a product by id
router.delete('/product', (req, res, next) => deleteProductById(req, res))

// POST new user
router.post('/product', (req, res) => postNewProduct(req, res))



module.exports = router;
