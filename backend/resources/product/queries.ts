import { GraphQLID, GraphQLList, GraphQLObjectType } from "graphql";
import { ProductType, totalStockValueType } from "../../models/schema";
import { getProduct, getProducts, getTotalStockValue } from "./resolvers";


export const productQuery = new GraphQLObjectType({
    name: "productQuery",
    fields: () => ({
        products: {
            type: new GraphQLList(ProductType),
            resolve: async () => {
                return getProducts();
            }
        },
        product: {
            type: ProductType,
            args: {
                _id: { type: GraphQLID },
            },
            resolve: async (_, { _id }) => {
                return getProduct(_id)
            }
        },
        totalStockValue: {
            type: new GraphQLList(totalStockValueType),
            resolve: async () => {
                return getTotalStockValue();
            }
        }
    })
})
