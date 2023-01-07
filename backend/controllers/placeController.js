const { createCinemahall, editCinemahall, removeCinemahall, editCinemahallPrice, createPlace, editPlace, removePlace, readCinemahalls, readPlaces, editPrice } = require('../services/place')

const cinemahall_read = async (req, res) => {
  try {
    const { status, data: {rows} } = await readCinemahalls()
    res.status(status).send(rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const cinemahall_create = async (req, res) => {
  try {
    const { body: { count_x, count_y } } = req
    const { status } = await createCinemahall(count_x, count_y)
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const cinemahall_edit = async (req, res) => {
  try {
    const { body: { id, count_x, count_y } } = req
    const { status, data: {rows} } = await editCinemahall(id, count_x, count_y);
    res.status(status).send(rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const cinemahall_edit_price = async (req, res) => {
  try {
    const { body: { id, price, price_vip } } = req
    const { status, data: {rows} } = await editCinemahallPrice(id, price, price_vip);
    res.status(status).send(rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const cinemahall_remove = async (req, res) => {
  try {
    const { status } = await removeCinemahall(req.params.id);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const place_read = async (req, res) => {
  try {
    const { query: { hall_id } } = req
    const { status, data: {rows} } = await readPlaces(hall_id)
    res.status(status).send(rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const place_create = async (req, res) => {
  try {
    const { body: { hall_id, is_vip, row } } = req
    const { status } = await createPlace(hall_id, is_vip, row);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const place_edit = async (req, res) => {
  try {
    const { body: { id, hall_id, is_vip, row } } = req
    const { status, data: {rows} } = await editPlace(id, hall_id, is_vip, row);
    res.status(status).send(rows);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const places_edit = async (req, res) => {
  try {
    const { body: { places } } = req
    for (const p of places) {
      await editPlace(p.id, p.is_vip, p.is_blocked)
    }

    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const place_remove = async (req, res) => {
  try {
    const { body: { id } } = req
    const { status } = await removePlace(id);
    res.status(status).send('ok');
  } catch (err) {
    res.status(500).send(err.message)

  }
}

module.exports = {
  cinemahall_create,
  cinemahall_edit,
  cinemahall_remove,
  place_create,
  place_edit,
  place_remove,
  place_read,
  places_edit,
  cinemahall_read,
  cinemahall_edit_price,
}
