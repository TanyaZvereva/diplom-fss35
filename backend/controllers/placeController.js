const {createCinemahall, editCinemahall, removeCinemahall, createPlace, editPlace, removePlace, readCinemaHalls, readPlaces} = require('../models/place')

const cinemahall_read = async (req, res) => {
   const {status, data} = await readCinemahalls() 
   res.status(status).send(data);
}
const cinemahall_create = async (req, res) => {
  const {body: {count_x, count_y}} = req
  const {status} = await createCinemahall(count_x, count_y)
  
  res.status(status);
}

const cinemahall_edit = async (req, res) => {
  const {body: {id, count_x, count_y}} = req
  const {status, data} = await editCinemahall(id, count_x, count_y);
    res.status(status).send(data);
}

const cinemahall_remove = async (req, res) => {
    const {body: {id}} = req
    const {status, data} = await removeCinemahall(id);
      res.status(status);
  }

const place_read = async (req, res) => {
    const {body: {hall_id}} = req
    const {status, data} = await readPlaces(hall_id) 
    res.status(status).send(data);
 }

const place_create = async (req, res) => {
  const {body: {hall_id, is_vip, row}} = req
  const {status} = await createPlace(hall_id, is_vip, row);
  
  res.status(status);
}

const place_edit = async (req, res) => {
  const {body: {id, hall_id, is_vip, row}} = req
  const {status, data} = await editPlace(id, hall_id, is_vip, row);
    res.status(status).send(data);
}

const place_remove = async (req, res) => {
    const {body: {id}} = req
    const {status, data} = await removePlace(id);
      res.status(status);
  }

module.exports = {
  cinemahall_create,
  cinemahall_edit,
  cinemahall_remove,
  place_create,
  place_edit,
  place_remove,
  place_read,
  cinemahall_read
}