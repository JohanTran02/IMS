import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ManufacturerType, ProductType, totalStockValueType } from "../../models/schema";
import { getCriticalStockProducts, getlowStockProducts, getProduct, getProducts, getTotalStockValue, getTotalStockValueByManufacturer, getManufacturers } from "./resolvers";
import { IManufacturer } from "../manufacturer/types";

export const productQuery = new GraphQLObjectType({
    name: "productQuery",
    fields: () => ({
        products: {
            type: new GraphQLList(ProductType),
            args: {
                limit: { type: GraphQLInt }
            },
            resolve: async (_, { limit }) => {
                return getProducts(limit);
            }
        },
        product: {
            type: ProductType,
            args: {
                sku: { type: GraphQLString },
            },
            resolve: async (_, { sku }) => {
                return getProduct(sku)
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
        },
        manufacturers: {
            type: new GraphQLList(ManufacturerType),
            resolve: async (): Promise<IManufacturer[]> => {
                return getManufacturers();
            }
        }
    })
})
