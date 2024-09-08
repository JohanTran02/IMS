import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

//REST
export interface UserREST {
    id: string,
    name: string,
}

//GraphQL
const ContactType = new GraphQLObjectType({
    name: "Contact",
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
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

const totalStockValueType = new GraphQLObjectType({
    name: "TotalStockValue",
    fields: {
        total: { type: GraphQLInt }
    }
})


const ContactInputType = new GraphQLInputObjectType({
    name: "ContactInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
    }),

})

const ManufacturerInputType = new GraphQLInputObjectType({
    name: "ManufacturerInput",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        country: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        address: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: ContactInputType }
    },
})

const ProductInputType = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerInputType },
        amountInStock: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

export { ProductInputType, totalStockValueType, ManufacturerType, ProductType };