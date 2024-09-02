require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
const http = require('http');
const compression = require ('compression');
const port = process.env.PORT || 3002;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const redisCache = require('./helpers/redisCache');

// Importação das rotas
const loginRoutes = require('./routes/login');
const characterRoutes = require('./routes/characterIndex');
const { initializeUsers } = require('./models/user'); 


// Variável de ambiente
const secret = process.env.SECRET;

var app = express();

//Cors
app.use(cors({
    origin: `http://localhost:5173`,
    methods: `GET,POST,PUT,DELETE`
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

//Redis
(async () => {
    try {
        const client = await redisCache;  // Aguarda o cliente Redis ser conectado
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();


// Configuração das rotas
app.use('/', loginRoutes);
app.use('/character', characterRoutes);

// Catch Error 404
app.use(function(req, res, next) {
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
const httpServer = http.createServer(app);

httpServer.listen(port, async () => {
    console.log("Listening on: " + port);

    try {
        // Inicializa o banco de dados e cria usuários
        await initializeUsers();
        console.log("Users initialized successfully.");
    } catch (error) {
        console.error("Error during user initialization:", error);
    }
})

