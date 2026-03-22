const express = require('express');
const router = express.Router();
const items = require('../data/items.json');
const { requireAdmin } = require('../middleware/auth');

router.get(['/', '/index'], (req, res) => {
    res.render('index', { pageTitle: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Contact' });
});

router.get('/products', (req, res) => {
    res.render('products', { pageTitle: 'Shop', items });
});

router.get('/update_prod', requireAdmin, (req, res) => {
    console.log("update_prod route hit");
    res.render('update_prod', { pageTitle: 'Update Database', items });
});

module.exports = router;