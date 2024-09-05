import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

//REST
export interface UserREST {
    id: string,
    name: string,
}

//GraphQL
const ContactType = new GraphQLObjectType({
    name: "Contact",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLInt },
    }),

})

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


const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerType },
        amountInStock: { type: GraphQLInt }
    },
})

export { ManufacturerType, ProductType };