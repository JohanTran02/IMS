import { GraphQLObjectType, GraphQLString } from "graphql";

//REST
export interface UserREST {
    id: string,
    name: string,
}

//GraphQL
export let userGraphQL = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    },
})
