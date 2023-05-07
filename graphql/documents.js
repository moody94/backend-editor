import { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLList} from 'graphql'

const DocumentType = new GraphQLObjectType({
    name: 'document',
    description: 'This is a document',
    fields: () => ({
        title: {type: GraphQLNonNull(GraphQLString)},
        bor: {type: GraphQLNonNull(GraphQLString)}, 
        _id: {type: GraphQLNonNull(GraphQLString)},
        userId: {type: GraphQLList(GraphQLString)}
    })
})

export default DocumentType