import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";

const ContactType = new GraphQLObjectType({
    name: "Contact",
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),

})

const ContactInputType = new GraphQLInputObjectType({
    name: "ContactInput",
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),

})

export { ContactInputType, ContactType }