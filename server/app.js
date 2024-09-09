require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const xss = require('xss-clean');
const cors = require('cors');
const https = require('https');
const compression = require ('compression');
const port = process.env.PORT || 3002;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const log = require('./helpers/log')
const redisCache = require('./helpers/redisCache');
const fs = require('fs');
const logger = require('./helpers/logWinston');

// Importação das rotas
const loginRoutes = require('./routes/login');
const characterRoutes = require('./routes/characterIndex');
const searchCharacterRoutes = require('./routes/characterIndex');
const { initializeUsers } = require('./models/user'); 

// Variável de ambiente
const secret = process.env.SECRET;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//XSS clean
app.use(xss());

//Cors
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Authorization', 'Content-Type'], 
}));


//Chave SSL
const privateKey = fs.readFileSync('./certificate/key.pem', 'utf-8');
const certificate = fs.readFileSync('./certificate/cert.pem', 'utf-8');
const credentials = {key: privateKey, cert: certificate};

app.use(compression());

//Morgan
app.use(log);


// Configuração das rotas
app.use('/', loginRoutes);
app.use('/character', characterRoutes);
app.use('/character', searchCharacterRoutes);

// Catch Error 404
app.use(function(req, res, next) {
    //winston
    logger.info(`${req.method} ${req.url}`);
    next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.json({ message: err.message || "An undefined error has occurred" });
});



//Server Port
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, async () => {
    console.log("Listening on: " + port);

    try {
        await initializeUsers();
        console.log("Users initialized successfully.");
    } catch (error) {
        console.error("Error during user initialization:", error);
    }
})

