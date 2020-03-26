const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/ongControllers')
const incidentController = require('./controllers/incidentControllers')
const profileController = require('./controllers/profileControllers')
const sessionsController = require('./controllers/sessionControllers')

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

routes.get('/profile', profileController.index)

routes.post('/sessions', sessionsController.create)

module.exports = routes