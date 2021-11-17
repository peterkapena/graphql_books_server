const app = require('express')()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const cors = require('cors')

app.use(cors())

mongoose.connect(
    'mongodb+srv://graphqlbooks:graphqlbooks@grpahql-books.folt5.mongodb.net/grpahql-books?retryWrites=true&w=majority'
)

mongoose.connection.once('open', () => {
    console.log('connected to db')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => console.log('I am running on port 4000'))
