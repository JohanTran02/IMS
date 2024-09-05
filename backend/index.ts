import express from 'express';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createHandler } from "graphql-http/lib/use/express";
import { connectToDB } from "./connect";
import cors from "cors"
import { ruruHTML } from "ruru/server"
// import { contactQuery } from "./resources/contact/queries"
import { manufacturerQuery } from "./resources/manufacturer/queries"
import { productQuery } from "./resources/product/queries"
// import { productMutation } from './resources/product/mutation';

connectToDB();
const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root query for all READ endpoints",
    fields: {
        // contact: { type: contactQuery, resolve: () => ({}) },
        manufacturer: { type: manufacturerQuery, resolve: () => ({}) },
        product: { type: productQuery, resolve: () => ({}) }
    },
});

// const RootMutation = new GraphQLObjectType({
//     name: "RootMutation",
//     description: "Root mutation for all CREATE,DELETE and UPDATE endpoints",
//     fields: {
//         productMutation: { type: productMutation, resolve: () => ({}) },
//     }
// });

const schema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.all("/graphql", createHandler({
    schema: schema,
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})