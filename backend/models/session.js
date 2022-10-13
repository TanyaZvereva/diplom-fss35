const connect = require('../database');
const myConnect = connect

const sqlCreateSession = {
  text: `INSERT INTO public.session (time_start, time_end, movie_id) VALUES ($1, $2, $3)
    RETURNING id, time_start, time_end, movie_id`
}

const sqlShowsSession = {
  text: `SELECT * FROM public.session`
}

const sqlUpdateSession = {
  text: `UPDATE public.session SET time_start=$1, time_end=$2 WHERE id=$3
    RETURNING id, time_start, time_end`
}

const sqlDeleteSession = {
  text: `DELETE FROM public.session WHERE id=$1;`
}

const sqlCreateMovie = {
    text: `INSERT INTO public.movie (info) VALUES ($1)
      RETURNING info`
  }
  
  const sqlShowsMovie = {
    text: `SELECT * FROM public.movie`
  }
  
  const sqlUpdateMovie = {
    text: `UPDATE public.movie SET info=$1 WHERE id=$2
      RETURNING id, info`
  }
  
  const sqlDeleteMovie = {
    text: `DELETE FROM public.movie WHERE id=$1;`
  }



const readSession = async () => ({status : 200, data: await myConnect.query(sqlShowsSession)})

const createSession = async (time_start, time_end, movie_id) => {
  const newProject = await myConnect.query(sqlCreateSession, [time_start, time_end, movie_id])
  return {status: 200, data: newProject.rows[0]}
}

const editSession = async (id, time_start, time_end) => {
  return {status: 200, data: await myConnect.query(sqlUpdateSession, [time_start, time_end, id])}
}

const removeSession = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteSession, [id])})

const readMovie = async () => ({status : 200, data: await myConnect.query(sqlShowsMovie)})

const createMovie = async (info) => {
  const newProject = await myConnect.query(sqlCreateMovie, [info])
  return {status: 200, data: newProject.rows[0]}
}

const editMovie = async (id,info) => {
  return {status: 200, data: await myConnect.query(sqlUpdateMovie, [info, id])}
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