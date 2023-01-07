const {sqlShowsCinemahall, sqlCreateCinemahall, sqlUpdateCinemahall, sqlUpdateCinemahallPrices, sqlDeleteCinemahall,sqlCreatePlace,sqlShowsPlace,sqlDeletePlace,sqlUpdatePlace} = require('../models/place')
const connect = require('../database')
const myConnect = connect

const readCinemahalls = async () => ({status : 200, data: await myConnect.query(sqlShowsCinemahall)})

const createCinemahall = async (count_x, count_y) => {
  const newProject = await myConnect.query(sqlCreateCinemahall, [count_x, count_y])
  for(let i = 1; i <= count_x; i++) {
    for(let j  = 1; j <= count_y; j++){
      await myConnect.query(sqlCreatePlace, [newProject.rows[0].id, i, j])
    }
  }
  return {status: 200, data: newProject.rows[0]}
}

const editCinemahall = async (id, count_x, count_y, is_vip, is_blocked) => {
  return {status: 200, data: await myConnect.query(sqlUpdateCinemahall, [count_x, count_y, is_vip, is_blocked, id])}
}

const editCinemahallPrice = async (id, price, price_vip) => {
  return {status: 200, data: await myConnect.query(sqlUpdateCinemahallPrices, [price, price_vip, id])}
}

const removeCinemahall = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteCinemahall, [id])})

const readPlaces = async (hall_id) => ({status : 200, data: await myConnect.query(sqlShowsPlace, [hall_id])})

const createPlace = async (hall_id, is_vip, row, is_blocked) => {
  const newProject = await myConnect.query(sqlCreatePlace, [hall_id, is_vip, row, is_blocked])
  return {status: 200, data: newProject.rows[0]}
}

const editPlace = async (id, is_vip, is_blocked) => {
  return {status: 200, data: await myConnect.query(sqlUpdatePlace, [is_vip, is_blocked, id])}
}

const removePlace = async (id) => ({status: 200, data: await myConnect.query(sqlDeletePlace, [id])})

module.exports = {
  editCinemahallPrice,
  readCinemahalls,
  createCinemahall,
  editCinemahall,
  removeCinemahall,
  readPlaces,
  createPlace,
  editPlace,
  removePlace,
}