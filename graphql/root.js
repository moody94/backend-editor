const database = require("../models/database");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const { getItems } = require("../src/search");
const { getUsers } = require("../src/login");

DocumentType = new GraphQLObjectType({
    name: 'document',
    description: 'This is a document',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        bor: { type: GraphQLString },
        userId: { type: GraphQLString },
        _id: { type: GraphQLString },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'get data from document',
    fields: () => ({
        document: {
            type: new GraphQLList(DocumentType),

            resolve: async () => {
                const docs = await getItems()
                return docs  
            }
        },
    }),
})

module.exports = RootQueryType;
