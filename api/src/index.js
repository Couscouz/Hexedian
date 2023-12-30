require('dotenv').config()

const express = require('express')
const connectDB = require('./database/db')
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
  res.setHeader('Access-Control-Allow-Origin', '*');

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

app.use("/players", require("./routes/player"));
app.use("/clans", require("./routes/clan"));
app.use("/data", require("./routes/data"));
app.use("/report", require("./routes/report"));
app.get("/test", (req,res) => {res.json({message: "Acces API ok"})});

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

const { run } = require('./services/automation');

//Each second
const testReccurence = '* * * * * *';

//Each day at 03am
const dailyReccurence = '0 3 * * *';

require('node-cron').schedule(dailyReccurence, run);