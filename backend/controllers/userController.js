const {createUser, readUser} = require('../models/user')
const jwt = require('jsonwebtoken')
const {privateKey} = require('../constants')

const user_create = async (req, res) => {
  const {body: {login, password}} = req
  if(!login || !password){
    res.status(400).send('Data is invalid');
  }
  try{
    const {status} = await createUser(login, password)
  
  res.status(status).send({login, password});
  } catch(err){
    res.status(500).send(err.message)
  }
  
}

const user_auth = async (req, res) => {
  const {body: {login, password}} = req
  const {status, data} = await readUser(login, password);
  if(data && data.rows && data.rows[0]) {
    const token = jwt.sign( data.rows[0], privateKey);
    res.status(status).send(token);
  }else{
    res.status(401).send('User not found');
  }
}

module.exports = {
  user_create,
  user_auth
}