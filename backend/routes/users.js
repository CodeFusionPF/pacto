const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/user/APIgetAllUsers');
const {postNewUser} = require('../controllers/user/APIpostNewUser');
const {setVerified} = require('../controllers/user/APISetIsVerified');
const {login} = require('../controllers/user/APILoginUser');
const checkUserExists = require('../database/helper/DBcheckUserExists');
const { verifyToken }  = require('../controllers/token/verifyToken');
const {autoLogin} = require('../middlewares/autoLoginMiddleware');
const {checkUserEmail} = require('../middlewares/checkUserMiddleWare');
const {checkIsAdmin} = require('../middlewares/checkAdminMiddleware');
const {sendRecoveryCode} = require('../controllers/user/APIRecoverySendCode');
const {recoveryPassword} = require('../controllers/user/APIRecoveryPassword');
const {editUser} = require('../controllers/user/APIEditUser');
const {getUserById} = require('../controllers/user/APIgetUserById');
const {logicBanUser} = require('../controllers/user/APIlogicBanUser');
const { getUserByProdId } = require('../controllers/user/APIgetSellerById');
const {getUserRating} = require('../controllers/user/APIGetUserRating');
// const { RequestCookiesAdapter } = require('next/dist/server/web/spec-extension/adapters/request-cookies');

const checkRegister = async (req, res, next) =>{

  if (!(await checkUserExists(null, req.body['email']))){
    return next();
  }
  return res.status(409).json({msg:"El usuario ingresado ya se encuentra en la base de datos"})
}


// GET all users
router.get('/users', checkIsAdmin,(req, res) => {getAllUsers(req, res)});

//GET user by ID
router.get('/user', (req, res) => {getUserById(req, res)});

//GET user rating by ID
router.get('/rating', (req, res) => {getUserRating(req, res)});

//GET seller data by product ID
router.get('/seller', (req, res) => {getUserByProdId(req, res)});

// POST new user
router.post('/user', checkRegister, (req, res) => {postNewUser(req, res)});

router.get('/verify', verifyToken , (req, res) => {setVerified(req, res)});

//LOGIN ROUTE
router.get('/login', (req, res) => {login(req, res)});

router.get('/autologin', autoLogin, (req, res) => {login(req, res)});

//Ruta para obtener el codigo de recuperacion de password
router.get('/recoverycode', checkUserEmail, (req, res) => {sendRecoveryCode(req, res)});

router.put('/recovery', (req,res, next) => {
  const {email, password, code} = req.body;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email || !password || !code){
    
    return res.status(401).json({msg: "Faltan datos para poder restablecer la contraseña!"});
  }

  if (!email.match(regex)){
    return res.status(401).json({msg: "Debes ingresar un email valido para continuar! (ejemplo@ejemplo.com)"});
  }

  next();
},(req, res) => {recoveryPassword(req, res)});

router.put('/edituser', (req, res) => {editUser(req, res)});

router.put('/banuser', checkIsAdmin, (req, res) => {logicBanUser(req, res)});



module.exports = router;

