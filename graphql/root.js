const database = require("../models/database");
var db;
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

DocumentType = new GraphQLObjectType({
    name: 'document',
    description: 'This is a document',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        bor: { type: GraphQLString },
        userId: { type: GraphQLString },



    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'get data from document',
    fields: () => ({
        document: {
            type: new GraphQLList(DocumentType),

            resolve: async () => {

                database.setCollectionName("document");
                db = await database.getDb();
                const res = await db.collection.find().toArray();
                return res;

            }
        },

    })
})




module.exports = RootQueryType;