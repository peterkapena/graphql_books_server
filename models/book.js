const mongoose = require('mongoose')
const { Schema } = mongoose

const booSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = new mongoose.model('Book', booSchema)