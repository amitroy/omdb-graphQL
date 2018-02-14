const fetch = require('node-fetch')
const {
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql')

/* fetch('http://www.omdbapi.com/?s=their&apikey=435a21f')
    .then(response => {
        return response.json();
    }); */


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'description bravo',
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: data => {
                return data.Title
            }
        },
        year: {
            type: GraphQLString,
            resolve: data => {
                return data.Year
            }
        },
        imdbID: {
            type: GraphQLString,
            resolve: data => {
                return data.imdbID
            }
        },
        type: {
            type: GraphQLString,
            resolve: data => {
                return data.Type
            }
        },
        posterURL: {
            type: GraphQLString,
            resolve: data => {
                return data.Poster
            }
        },
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'description alpha',
        fields: () => ({
            movie: {
                type: new GraphQLList(MovieType),
                args: {
                    movieTitle: {
                        type: GraphQLString
                    },
                },
                resolve: (root, args) => fetch(`http://www.omdbapi.com/?s=${encodeURI(args.movieTitle)}&apikey=435a21f`)
                    .then(response => response.text())
                    .then(textResponse => JSON.parse(textResponse).Search)

            }

        })
    })
})