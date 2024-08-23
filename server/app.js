var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');


// Importação das rotas
const loginRoutes = require('./routes/login');
const characterRoutes = require('./routes/characterIndex');
require('dotenv').config();

// Variável de ambiente
const secret = process.env.SECRET;

var app = express();

//Cors
app.use(cors({
    origin: 'http://localhost:5173', // Permitir requisições do frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração das rotas
app.use('/', loginRoutes);
app.use('/character', characterRoutes);

// Catch Error 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.json({ message: "An undefined error has occurred" });
});

module.exports = app;
