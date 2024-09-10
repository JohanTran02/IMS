import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
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
                _id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (_, { _id }) => {
                return deleteProduct(_id);
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                input: {
                    type: UpdateProductInput
                }
            },
            resolve: async (_, { _id, input }) => {
                return updateProduct(_id, input)
            }
        }
    })
})
