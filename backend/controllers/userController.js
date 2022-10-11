const {createUser, readUser} = require('../models/user')
const jwt = require('jwt')
const {privateKey} = require('../constants')

const user_create = async (req, res) => {
  const {body: {login, password}} = req
  const {status} = await createUser(login, password)
  
  res.status(status).send({login, password});
}

const user_auth = async (req, res) => {
  const {body: {login, password}} = req
  const {status, data} = await readUser(login, password);
  jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    res.status(status).send(token);
  });
  
}

module.exports = {
  user_create,
  user_auth
}