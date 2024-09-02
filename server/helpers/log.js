const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Define o caminho completo do diretório de logs
const logsDir = path.join(__dirname, 'logs');

// Verifica se o diretório de logs existe, caso contrário, cria o diretório
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });  // Cria o diretório logs se ele não existir
}

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'), 
    { flags: 'a' }
);

morgan.token('body', (req) => JSON.stringify(req.body));  // Registra o corpo da requisição

const log = morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => res.statusCode < 400,  // Registra apenas requisições que falham
    stream: accessLogStream
});

module.exports = log;