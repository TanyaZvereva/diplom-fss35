const{sqlShowsTicket, sqlCreateTicket, sqlDeleteTicket} = require('../models/ticket')
const connect = require('../database');
const myConnect = connect
const readTicket = async () => ({status : 200, data: await myConnect.query(sqlShowsTicket)})
  
const createTicket = async (place_id, movie_id, code) => {
    const newProject = await myConnect.query(sqlCreateTicket, [place_id, movie_id, code])
    return {status: 200, data: newProject.rows[0]}
}
  
const removeTicket = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteTicket, [id])})
  
module.exports = {
    readTicket,
    createTicket,
    removeTicket
}