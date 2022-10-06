const {createUser, readUser} = require('../models/user')

const user_create = async (req, res) => {
  const {body: {login, password}} = req
  const {status} = await createUser(login, password)
  
  res.status(status).send({login, password});
}

const user_auth = async (req, res) => {
  const {body: {login, password}} = req
  const {status, data} = await readUser(login, password);
  res.status(status).send(data);
}

module.exports = {
  user_create,
  user_auth
}