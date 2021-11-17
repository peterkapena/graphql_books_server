const mongoose, { Schema } = require('mongoose')

const authoSchema = new Schema({
    name: String,
    age: Number,
})

module.exports = mongoose.model('Author', authoSchema)