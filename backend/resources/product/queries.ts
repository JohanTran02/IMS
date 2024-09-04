import { GraphQLList, GraphQLObjectType } from "graphql";
import { Product } from "../../models/models";
import { ProductType } from "../../models/schema";

export const productQuery = new GraphQLObjectType({
    name: "productQuery",
    fields: () => ({
        contacts: {
            type: new GraphQLList(ProductType),
            resolve: async () => {
                return await Product.find({});
            }
        }
    })
})
