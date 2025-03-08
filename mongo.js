const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =`<add the connection uri with mongodb atlas here>`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (name && number) {
  const phone = new Phone({
    name: name,
    number: number,
})

phone.save().then(result => {
  console.log(`added`, name, `number`, number, `to phonebook`)
  mongoose.connection.close()
})
}

if (!name && !number) {
  Phone.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}