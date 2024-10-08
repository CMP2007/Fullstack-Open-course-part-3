const express = require('express')
const app = express()

const peoples = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    }, 
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {    
  response.json(peoples)
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

app.get('/api/persons/:id', (request,response)=>{
    const id = request.params.id
    const person = peoples.find(person => person.id == id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const people = peoples.filter(people => people.id !== id)
  response.json(people)
})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})