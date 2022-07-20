const path = require('path');

const express = require('express');

const productsController = require('../controller/products');

const router = express.Router();

router.get('/login',productsController.getLogin);
router.get('/signup',productsController.getSignup);
router.post('/signup',productsController.postSignup);
router.post('/login',productsController.postLogin);
router.post('/logout',productsController.postLogout);

module.exports = router;
