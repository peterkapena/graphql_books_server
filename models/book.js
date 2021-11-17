const mongoose, { Schema } = require('mongoose')
 
const booSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book', booSchema)