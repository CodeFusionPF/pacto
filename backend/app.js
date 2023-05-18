const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const send = require('./controllers/utils/emailService/emailSender')
const mercadopago = require("mercadopago");
require('dotenv').config()

//RUTAS!!!
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const shoppingCart = require('./routes/shoppingCart');
const paymentRouter = require('./routes/payment');
const departmentsRouter = require('./routes/departments');
const salesRouter = require('./routes/sales');
const transactionsRouter = require('./routes/transactions')
const questionsRouter = require('./routes/questions');
const reviewsRouter = require('./routes/reviews');
const walletsRouter = require('./routes/wallets');

//CONEXION A LA DB!!!
const mongoose = require('./database/mongoose');

//CONEXION A FIREBASE ADMIN
const { firebaseAdmin, firebaseAdminRouter } = require('./firebase/firebaseAdmin');

const app = express();

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);

//All routes of the users!!!
app.use(usersRouter);


//All routes of the products!!
app.use(productsRouter)

//All routes of the categories!!
app.use(categoriesRouter)

//Routes ShoppingCart
app.use(shoppingCart)

//Route Payment
app.use(paymentRouter)

//Route of departments
app.use(departmentsRouter);

//Routes of sales
app.use(salesRouter);

//Routes of questions
app.use(questionsRouter);

//Routes of transactions
app.use(transactionsRouter);

//Routes of reviews
app.use(reviewsRouter);

//Routes of wallets
app.use(walletsRouter);

//All routes of the Firebase!!

app.use(firebaseAdminRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
