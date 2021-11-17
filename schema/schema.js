const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, _) {
                return Author.findById(parent.authorId)
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
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const query = new GraphQLObjectType({
    name: 'query',
    description: 'The entry point',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: () => Book.find()
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: () => Author.find()
        },
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            resolve(_, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(_, args) {
                return new Book(args).save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query,
    mutation
})

