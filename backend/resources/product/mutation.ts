import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProductInputType, ProductType } from "../../models/schema";
import { addProduct, deleteProduct, updateProduct } from "./resolvers";

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
            resolve: async (_, { _id }) => {
                return updateProduct(_id)
            }
        }
    })
})
