const app = require('express')()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

app.use('/graphql', graphqlHTTP({
    schema
}))

app.listen(4000, () => console.log('I am running on port 4000'))
