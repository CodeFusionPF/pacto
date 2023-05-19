const express = require('express');
const router = express.Router();
const {getAllProducts} = require('../controllers/product/APIgetAllProducts')
const {getProductById} = require('../controllers/product/APIgetProductById');
const {banProductById} = require('../controllers/product/APIBanProduct');
const {postNewProduct} = require('../controllers/product/APIpostNewProduct');
const {getProductsByFilters} = require('../controllers/product/APIgetProductByFilters');
const getProductByName = require('../controllers/product/APIgetProductByName');
const middlewarePostNewProduct = require('../middlewares/productMiddleware');
const {autoLogin} = require('../middlewares/autoLoginMiddleware');
const {getAllProductsAdmin} = require('../controllers/product/APIAdminGetAllProds');
const {checkIsAdmin} = require('../middlewares/checkAdminMiddleware');
const getProductByLabel = require('../controllers/product/APIgetProductByLabel');

// GET all products
//router.get('/products', (req, res, next) => getAllProducts(req, res));

//La funcion getProductsByFilters trae todos los productos si se manda un query por defecto
router.get('/products', (req, res, next) => getProductsByFilters(req, res));

router.get('/adminproducts', checkIsAdmin, (req, res) => {getAllProductsAdmin(req, res)});

//GET Product by id
router.get('/product', (req, res, next) => getProductById(req, res));

//DELETE a product by id
router.put('/product', (req, res, next) => banProductById(req, res))

// POST new product
router.post('/product', middlewarePostNewProduct, (req, res) => postNewProduct(req, res))

//GET Product by name
router.get('/productsname', (req, res, next) => getProductByName(req, res));

// GET Product by label
router.get('/productslabel', (req, res, next) => getProductByLabel(req, res));


module.exports = router;
