const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi} = require('celebrate')

const ongController = require('./controllers/ongControllers')
const incidentController = require('./controllers/incidentControllers')
const profileController = require('./controllers/profileControllers')
const sessionsController = require('./controllers/sessionControllers')

routes.get('/ongs', ongController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2) 
    })
}),ongController.create)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),incidentController.index)

routes.post('/incidents', incidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}) ,incidentController.delete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),profileController.index)

routes.post('/sessions', sessionsController.create)

module.exports = routes