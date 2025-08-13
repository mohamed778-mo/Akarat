const mongoose = require("mongoose")
require("dotenv").config()
const URL = 'mongodb+srv://muhammadelmalla13:JjBHaEuJIdhKZfkC@cluster0585akarat.korto89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0585AKARAT'
const connection = () => {
   mongoose.connect(URL)
      .then(() => { console.log('done connection !!') })
      .catch((error) => { console.log(error.message) })
}

module.exports = connection


