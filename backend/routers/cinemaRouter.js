const express = require('express')
const router = express.Router() //middleware, collects our routes
const {user_create, user_auth} = require('../controllers/userController')
const {session_create,
    session_edit,
    session_remove,
    movie_create,
    movie_edit,
    movie_remove,
    movie_read,
    session_read} = require('../controllers/sessionController')
const {ticket_create,
    ticket_remove,
    ticket_read} = require('../controllers/ticketController')
const {cinemahall_create,
    cinemahall_edit,
    cinemahall_remove,
    place_create,
    place_edit,
    place_remove,
    place_read,
    cinemahall_read} = require('../controllers/placeController')

router.post('/user/add', user_create)
router.post('/user/auth', user_auth)
router.post('/session', session_create)
router.put('/session', session_edit)
router.delete('/session', session_remove)
router.get('/session', session_read)
router.post('/movie', movie_create)
router.put('/movie', movie_edit)
router.delete('/movie', movie_remove)
router.get('/movie', movie_read)
router.post('/ticket', ticket_create)
router.delete('/ticket', ticket_remove)
router.get('/ticket', ticket_read)
router.post('/cinemahall', cinemahall_create)
router.put('/cinemahall', cinemahall_edit)
router.delete('/cinemahall', cinemahall_remove)
router.get('/cinemahall', cinemahall_read)
router.post('/place', place_create)
router.put('/place', place_edit)
router.delete('/place', place_remove)
router.get('/place', place_read)





module.exports = router