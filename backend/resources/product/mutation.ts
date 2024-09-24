import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { CreateProductInput, ProductType, UpdateProductInput } from "../../models/schema";
import { addProduct, deleteProduct, updateProduct } from "./resolvers";

export const productMutation = new GraphQLObjectType({
    name: "productMutations",
    fields: () => ({
        addProduct: {
            type: ProductType,
            args: {
                input: {
                    type: CreateProductInput
                }
            },
            resolve: async (_, { input }) => {
                return addProduct(input);
            }
        },
        deleteProduct: {
            type: GraphQLString,
            args: {
                sku: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_, { sku }) => {
                return deleteProduct(sku);
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                sku: { type: new GraphQLNonNull(GraphQLString) },
                input: {
                    type: UpdateProductInput
                }
            },
            resolve: async (_, { sku, input }) => {
                return updateProduct(sku, input)
            }
        }
    })
})
