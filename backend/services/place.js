const {sqlShowsCinemahall, sqlCreateCinemahall, sqlUpdateCinemahall, sqlDeleteCinemahall,sqlCreatePlace,sqlShowsPlace,sqlDeletePlace,sqlUpdatePlace} = require('../models/place')
const connect = require('../database')
const myConnect = connect

const readCinemahalls = async () => ({status : 200, data: await myConnect.query(sqlShowsCinemahall)})

const createCinemahall = async (count_x, count_y) => {
  const newProject = await myConnect.query(sqlCreateCinemahall, [count_x, count_y])
  return {status: 200, data: newProject.rows[0]}
}

const editCinemahall = async (id, count_x, count_y) => {
  return {status: 200, data: await myConnect.query(sqlUpdateCinemahall, [count_x, count_y, id])}
}

const removeCinemahall = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteCinemahall, [id])})

const readPlaces = async (hall_id) => ({status : 200, data: await myConnect.query(sqlShowsPlace, [hall_id])})

const createPlace = async (hall_id, is_vip, row) => {
  const newProject = await myConnect.query(sqlCreatePlace, [hall_id, is_vip, row])
  return {status: 200, data: newProject.rows[0]}
}

const editPlace = async (id,is_vip) => {
  return {status: 200, data: await myConnect.query(sqlUpdatePlace, [is_vip, id])}
}

const removePlace = async (id) => ({status: 200, data: await myConnect.query(sqlDeletePlace, [id])})

module.exports = {
  readCinemahalls,
  createCinemahall,
  editCinemahall,
  removeCinemahall,
  readPlaces,
  createPlace,
  editPlace,
  removePlace
}