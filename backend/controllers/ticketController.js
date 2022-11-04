const { createTicket, removeTicket, readTicket } = require('../services/ticket')
const { v4: uuidv4 } = require('uuid')

const ticket_read = async (req, res) => {
  try {
    const { body: { session_id, place_id } } = req
    const { status, data } = await readTicket(session_id, place_id)
    res.status(status).send(data);
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const ticket_create = async (req, res) => {
  try {
    const { body: { session_id, place_id } } = req
    const code = uuidv4()
    const { status } = await createTicket(session_id, place_id, code)
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const ticket_remove = async (req, res) => {
  try {
    const { body: { id } } = req
    const { status, data } = await removeTicket(id);
    res.status(status).send('ok');
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  ticket_create,
  ticket_remove,
  ticket_read
}