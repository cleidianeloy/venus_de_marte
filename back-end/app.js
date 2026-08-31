const express = require('express');
const app = express();

const cors = require('cors');

const middleware = require('./utils/middleware');

const contactRouter = require('./controllers/contact');


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/contact', contactRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app