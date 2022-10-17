const {createTicket, removeTicket, readTicket} = require('../models/ticket')
const { v4: uuidv4 } = require('uuid')

const ticket_read = async (req, res) => {
   const {body: {session_id, place_id}} = req
   const {status, data} = await readTicket(session_id, place_id) 
   res.status(status).send(data);
}
const ticket_create = async (req, res) => {
  const {body: {session_id, place_id}} = req
  const code = uuidv4()
  const {status} = await createTicket(session_id, place_id, code)
  
  res.status(status).send('ok');
}
const ticket_remove = async (req, res) => {
    const {body: {id}} = req
    const {status, data} = await removeTicket(id);
      res.status(status).send('ok');
  }

module.exports = {
  ticket_create,
  ticket_remove,
  ticket_read
}