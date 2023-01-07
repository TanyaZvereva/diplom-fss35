const jwt = require('jsonwebtoken')
const {privateKey} = require('./constants')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const cinemaRouters = require('./routers/cinemaRouter')

//send data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); //json format
app.use(cors({origin: "http://localhost:3001"}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Redirect, Authorization")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
  return next()
})
app.use(async (req, res, next) => {
  if (req.originalUrl.includes('user')) {
    return next()
  }
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    console.log(req.headers)
    jwt.verify(token, privateKey, function (err, decoded) {
      console.log(decoded) // bar
      return next()
    });
  } else {
    res.status(401).send('You need authorization')
  }
})

app.use('/api', cinemaRouters)


app.listen(8000, () => {
  console.log("Server is working!!!");
})