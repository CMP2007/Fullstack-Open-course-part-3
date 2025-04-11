require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Phone = require('./models/person')

app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {    
  Phone.find({}).then(phones => {
    response.json(phones)
  })
})

app.get('/info', (request, response)=>{
    const date = new Date();
    const format = {
        weekday: 'short',
        year: 'numeric', 
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Caracas',
        timeZoneName: 'long'
    }
    const formatDate = date.toLocaleString('en-US', format);
    const peoplesNum = peoples.length 
    
    response.send(`<h2>Phonebook has info for ${peoplesNum} people</h2> <p>${formatDate}</p>`)
})

app.get('/api/persons/:id', (request,response, next)=>{
    Phone.findById(request.params.id)
    .then(phone => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.use(express.json())
morgan.format('personalized', function (tokens, req, res) {
  return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body)
  ].join(' ')
});

app.use(morgan('personalized'));

app.post(`/api/persons`, (request, response) => {

  const body = request.body  

  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })

  phone.save().then(savedPhone => {
    response.json(savedPhone)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// controlador de solicitudes que resulten en errores (se diferencia por tener 4 argumentos)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})