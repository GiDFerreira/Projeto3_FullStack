const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',  // Define o nível de log (error, warn, info, http, verbose, debug, silly)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()  
    ),
    transports: [
        new winston.transports.Console(),  
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),  
        new winston.transports.File({ filename: 'logs/combined.log' })  
    ]
});

module.exports = logger;
