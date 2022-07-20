const path = require('path');

const express = require('express');

const productsController = require('../controller/products');
const isAuth = require('./isauth');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product',isAuth,productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product',isAuth, productsController.postAddProduct);

router.get('/AdminPanel',isAuth,productsController.getAdmin);

router.post('/delete-prodcut',isAuth,productsController.postDelete);

router.post('/edit-product',isAuth,productsController.postEdit);

router.post('/edit-submit',isAuth,productsController.postSubmit);

exports.routes = router;

