const app = require('express')()
const { graphqlHTTP } = require('express-graphql')

app.use('/graphql', graphqlHTTP({

}))

app.listen(4000, () => console.log('I am running on port 4000'))
