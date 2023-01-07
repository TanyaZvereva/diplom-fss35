const {createUser, readUser, getClientData, getClientPlaces} = require('../services/user')
const jwt = require('jsonwebtoken')
const {privateKey} = require('../constants')
const {removeCinemahall} = require("../services/place");

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


const get_client_data = async (req, res) => {
  const {status, data} = await getClientData();
  res.status(status).send(data.rows);
}

const get_client_places = async (req, res) => {
  const {status, data} = await getClientPlaces(req.params.id);
  res.status(status).send(data.rows);
}

module.exports = {
  user_create,
  user_auth,
  get_client_data,
  get_client_places
}