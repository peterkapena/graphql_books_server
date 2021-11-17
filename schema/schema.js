const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')

const books = [
    { name: 'Name of wind', genre: 'Fantasy', id: '1' },
    { name: 'The final empire', genre: 'Fantasy', id: '3' },
    { name: 'The long earth', genre: 'Action', id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        // author: { type: AuthorType }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            book: {
                type: BookType,
                args: { id: { type: GraphQLString } },
                resolve(_, args) {
                    return books.find(b => b.id == args.id)
                }
            },
        }
    })
})

