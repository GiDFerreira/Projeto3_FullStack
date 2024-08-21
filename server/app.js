var createError = require('http-errors');
var express = require('express');
const loginRoutes = require('./routes/login');
const characterRoutes = require('./routes/characterIndex');
require('dotenv').config();
const secret = process.env.SECRET;

//CRUDS
var characterRoutes = require('./routes/characterIndex');
var loginRoutes = require('./routes/login');

var app = express();

//Configura as rotas
app.use('/', loginRoutes)