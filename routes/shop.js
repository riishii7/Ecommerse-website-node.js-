const path = require('path');

const express = require('express');

const productsController = require('../controller/products');
const isAuth = require('./isauth');

const pkey = "pk_test_51KUZzwSJm64OwNNxObkTjguroqELiMPj2hQsjZrdJY41L2YuzkXtEbhEC0fGTX3jSHtA0Z5ffK7ZhOvMdW7ae9Ac00PglE6eFC";

const skey = "sk_test_51KUZzwSJm64OwNNxkpNkMrFCXkdfahyr3TSBIDapLX1XFP1u2XWlQgYZrXkXkH4L8XwUwaJdd8M34yeNOPtzT5cK00uFWQXxG2";

const stripe = require('stripe')(skey);

const router = express.Router();



router.get('/',productsController.getProducts);
router.get('/cart',isAuth,productsController.getCart);
router.post('/cart',isAuth,productsController.postCart);

router.post('/payment',isAuth,productsController.postPayment);

module.exports = router;
