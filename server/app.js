require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
const http = require('http');
const port = process.env.PORT;


// Importação das rotas
const loginRoutes = require('./routes/login');
const characterRoutes = require('./routes/characterIndex');


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


//Server Port
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log("Listening on: " + port);
})

