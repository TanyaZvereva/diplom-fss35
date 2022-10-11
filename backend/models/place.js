const connect = require('../database');
const myConnect = connect

const sqlCreateCinemahall = {
  text: `INSERT INTO public.cinema_hall (count_x, count_y) VALUES ($1, $2)
    RETURNING id, count_x, count_y`
}

const sqlShowsCinemahall = {
  text: `SELECT * FROM public.cinema_hall`
}

const sqlUpdateCinemahall = {
  text: `UPDATE public.cinema_hall SET count_x=$1, count_y=$2 WHERE id=$3
    RETURNING id, count_x, count_y`
}

const sqlDeleteCinemahall = {
  text: `DELETE FROM public.cinema_hall WHERE id=$1;`
}

const sqlCreatePlace = {
    text: `INSERT INTO public.place (hall_id, is_vip, row) VALUES ($1, $2, $3)
      RETURNING id, hall_id, is_vip, row`
  }
  
  const sqlShowsPlace = {
    text: `SELECT * FROM public.place WHERE hall_id=$1`
  }
  
  const sqlUpdatePlace = {
    text: `UPDATE public.place SET is_vip=$1 WHERE id=$2
      RETURNING id, hall_id, is_vip, row`
  }
  
  const sqlDeletePlace = {
    text: `DELETE FROM public.place WHERE id=$1;`
  }



const readCinemaHalls = async () => ({status : 200, data: await myConnect.query(sqlShowsCinemahall)})

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
  readCinemaHalls,
  createCinemahall,
  editCinemahall,
  removeCinemahall,
  readPlaces,
  createPlace,
  editPlace,
  removePlace
}