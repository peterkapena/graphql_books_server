const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql')

// const books = [
//     { name: 'Name of wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The final empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The final days', genre: 'Fantasy', id: '4', authorId: '3' },
//     { name: 'The long earth', genre: 'Action', id: '3', authorId: '1' },
// ]

// const authors = [
//     { name: 'Patrick', age: 88, id: '1' },
//     { name: 'Brandon', age: 77, id: '2' },
//     { name: 'Terry', age: 66, id: '3' },
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, _) {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(b => b.authorId === parent.id)
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        description: 'The entry point',
        fields: {
            book: {
                type: BookType,
                args: { id: { type: GraphQLID } },
                resolve(_, args) {
                    return books.find(b => b.id === args.id)
                }
            },
            author: {
                type: AuthorType,
                args: { id: { type: GraphQLID } },
                resolve(_, args) {
                    return authors.find(author => author.id === args.id)
                }
            },
            books: {
                type: new GraphQLList(BookType),
                resolve: () => books
            },
            authors: {
                type: new GraphQLList(AuthorType),
                resolve: () => authors
            },
        }
    })
})

