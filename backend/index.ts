import express from 'express';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createHandler } from "graphql-http/lib/use/express";
import { connectToDB } from "./connect";
import cors from "cors"
// import { ruruHTML } from "ruru/server"
import { productQuery } from "./resources/product/queries"
import { productMutation } from './resources/product/mutation';
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

connectToDB();
const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root query for all READ endpoints",
    fields: {
        product: { type: productQuery, resolve: () => ({}) }
    },
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Root mutation for all CREATE,DELETE and UPDATE endpoints",
    fields: {
        product: { type: productMutation, resolve: () => ({}) },
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})


const server = new ApolloServer({
    schema: schema
});

const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});


console.log(`Server ready at: ${url}`);

app.all("/graphql", createHandler({
    schema: schema,
}));

// app.get("/", (_req, res) => {
//     res.type("html")
//     res.end(ruruHTML({ endpoint: "/graphql" }))
// })

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// })