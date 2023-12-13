require('module-alias/register')
require('dotenv').config()

const express = require('express')
const connectDB = require('@app/database/db')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 5000

//DB connexion
connectDB()

const app = express()

// Middleware, traitement data de req
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.text());
app.use(express.json({ limit: '50mb' }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Content-Type', 'application/json');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/player", require("@app/routes/player.routes"))

//-------------------------------------------------------

const http = require('http').Server(app)
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

global.socketIO = socketIO;

socketIO.on('connection', (socket) => {

});