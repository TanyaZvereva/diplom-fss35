const{sqlCreateSession, sqlDeleteSession,sqlUpdateSession, sqlCreateMovie, sqlShowsMovie, sqlUpdateMovie, sqlDeleteMovie, sqlShowsSession} = require('../models/session')
const connect = require('../database');
const myConnect = connect

const readSession = async () => ({status : 200, data: await myConnect.query(sqlShowsSession)})

const createSession = async (time_start, cinemahall_id, movie_id) => {
  const newProject = await myConnect.query(sqlCreateSession, [time_start, cinemahall_id, movie_id])
  return {status: 200, data: newProject.rows[0]}
}

const editSession = async (id, time_start, time_end) => {
  return {status: 200, data: await myConnect.query(sqlUpdateSession, [time_start, time_end, id])}
}

const removeSession = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteSession, [id])})

const readMovie = async () => ({status : 200, data: await myConnect.query(sqlShowsMovie)})

const createMovie = async (info, duration) => {
  const newProject = await myConnect.query(sqlCreateMovie, [info, duration])
  return {status: 200, data: newProject.rows[0]}
}

const editMovie = async (id,info, duration) => {
  return {status: 200, data: await myConnect.query(sqlUpdateMovie, [info, id, duration])}
}

const removeMovie = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteMovie, [id])})

module.exports = {
  readSession,
  createSession,
  editSession,
  removeSession,
  readMovie,
  createMovie,
  editMovie,
  removeMovie
}