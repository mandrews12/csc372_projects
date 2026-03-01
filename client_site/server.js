/*
Meghan Andrews - 2/28/2026
This file sets up an Express server to serve a client-side website. 
It uses Express Handlebars as the templating engine to render dynamic views. 
The server listens on port 3000 and serves static files from the 'public' directory. 
It defines routes for the home page, about page, contact page, and products page, as well as catch-all routes for 404 and 500 errors.
*/

// Load the Express module.
const express = require('express');
// Define the port number (e.g., 3000).
const PORT = 3000;
// Create an Express application.
const app = express();
// Configure Express to serve static files from the public folder.
app.use(express.static('public'));
// Load the Express Handlebars module.
const handlebars = require('express-handlebars').create({ 
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a === b
  }
});
// Configure Handlebars as the view engine.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get(['/','/index'], (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact' });
});

app.get('/products', (req, res) => {
  res.render('products', { pageTitle: 'Shop' });
});
// A catch-all route that sets the status code to 404 and renders a custom 404.handlebars view.
app.use(/.*/, (req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
// A 500 error handler that sets the status code to 500 and renders a custom 500.handlebars view.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { pageTitle: 'Server Error' });
});

// Configure Express to serve static files from the public folder.
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});