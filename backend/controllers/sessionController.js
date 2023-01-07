const { createSession, editSession, removeSession, createMovie, editMovie, removeMovie, readSession, readMovie } = require('../services/session')
const _ = require('lodash')
const session_read = async (req, res) => {
  try {
    const { status, data } = await readSession()
    const rows = data.rows
    const grouped = _.groupBy(rows, 'cinemahall_id')
    res.status(status).send(grouped);
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const session_create = async (req, res) => {
  try {
    const { body: { time_start, movie_id, cinemahall_id } } = req
    const { status, data } = await createSession(time_start, cinemahall_id, movie_id)
    res.status(status).send(data);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const session_edit = async (req, res) => {
  try {
    const { body: { id, time_start, time_end } } = req
    const { status, data } = await editSession(id, time_start, time_end);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const session_remove = async (req, res) => {
  try {
    const { body: { id } } = req
    const { status, data } = await removeSession(id);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const movie_read = async (req, res) => {
  try {
    const { status, data } = await readMovie()
    res.status(status).send(data.rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const movie_create = async (req, res) => {
  try {
    const { body: { info, duration } } = req
    const { status } = await createMovie(info, duration);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const movie_edit = async (req, res) => {
  try {
    const { body: { id, info, duration } } = req
    const { status, data } = await editMovie(id, info, duration);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const movie_remove = async (req, res) => {
  try {
    const { params: { id } } = req
    const { status, data } = await removeMovie(id);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  session_create,
  session_edit,
  session_remove,
  movie_create,
  movie_edit,
  movie_remove,
  movie_read,
  session_read
}