import { GraphQLObjectType } from "graphql";
import { ProductInputType, ProductType } from "../../models/schema";
import { addProduct } from "./resolvers";

export const productMutation = new GraphQLObjectType({
    name: "productMutations",
    fields: () => ({
        addProduct: {
            type: ProductType,
            args: {
                input: {
                    type: ProductInputType
                }
            },
            resolve: async (_, { input }) => {
                return addProduct(input);
            }
        }
    })
})
