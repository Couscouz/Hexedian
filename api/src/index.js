require('module-alias/register')
require('dotenv').config()

const express = require('express')
const connectDB = require('@app/database/db')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3000

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

app.use("/players", require("@app/routes/player"))
app.use("/clans", require("@app/routes/clan"))
app.use("/data", require("@app/routes/data"))

/*
ROUTES

GET /players
GET /players/:id
GET /players/:id/clan

GET /clans
GET /clans/:id
GET /clans/:id/players

/data => temporaire

*/

//-------------------------------------------------------

const http = require('http').createServer(app);

http.listen(PORT);

console.log("API running on port " + PORT)

//---------DAILY-TRIGGER-------------

const { run } = require('@app/services/automation');

//Each second
const testReccurence = '* * * * * *';

//Each day at 03am
const dailyReccurence = '0 5 * * * *';

require('node-cron').schedule(dailyReccurence, run);