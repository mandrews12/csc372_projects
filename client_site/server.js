/*
Meghan Andrews - 2/28/2026
Express server entry point. Wires together middleware,
routes, and the Handlebars view engine.
*/
require('dotenv').config();
const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static('public'));

const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: { eq: (a, b) => a === b }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
const { setUserLocals } = require('./middleware/auth');

app.use(setUserLocals); 
// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// Error handlers
app.use(/.*/, (req, res) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { pageTitle: 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});