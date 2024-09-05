import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ProductType, totalStockValueType } from "../../models/schema";
import { getCriticalStockProducts, getlowStockProducts, getProduct, getProducts, getTotalStockValue, getTotalStockValueByManufacturer } from "./resolvers";


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
        },
        totalStockValueByManufacturer: {
            type: new GraphQLList(totalStockValueType),
            args: {
                manufacturerName: { type: GraphQLString },
            },
            resolve: async (_, { manufacturerName }) => {
                return getTotalStockValueByManufacturer(manufacturerName);
            }
        },
        lowStockProducts: {
            type: new GraphQLList(ProductType),
            resolve: async () => {
                return getlowStockProducts();
            }
        },
        criticalStockProducts: {
            type: new GraphQLList(ProductType),
            resolve: async () => {
                return getCriticalStockProducts();
            }
        }
    })
})
