import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType } from "graphql"
import { ContactType, ContactInputType } from "../contact/schema"

const ManufacturerType = new GraphQLObjectType({
    name: "Manufacturer",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        country: { type: GraphQLString },
        website: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: ContactType }
    },
})

const ManufacturerInputType = new GraphQLInputObjectType({
    name: "ManufacturerInput",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        country: { type: GraphQLString },
        website: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: ContactInputType }
    },
})

export { ManufacturerInputType, ManufacturerType }