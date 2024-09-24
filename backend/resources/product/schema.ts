import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLNonNull, GraphQLList } from "graphql";
import { ManufacturerType, ManufacturerInputType } from "../manufacturer/schema";

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerType },
        amountInStock: { type: GraphQLInt }
    },
})

const totalStockValueType = new GraphQLObjectType({
    name: "TotalStockValue",
    fields: {
        total: { type: GraphQLInt }
    }
})

const CreateProductInput = new GraphQLInputObjectType({
    name: "CreateProductInput",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerInputType },
        amountInStock: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

const UpdateProductInput = new GraphQLInputObjectType({
    name: "UpdateProductInput",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerInputType },
        amountInStock: { type: GraphQLInt }
    }
});

const NumberRangeFilterInput = new GraphQLInputObjectType({
    name: "NumberRangeFilterInput",
    fields: {
        gt: { type: GraphQLInt },
        gte: { type: GraphQLInt },
        lt: { type: GraphQLInt },
        lte: { type: GraphQLInt }
    }
})

const StringFilterInput = new GraphQLInputObjectType({
    name: "StringFilterInput",
    fields: {
        value: { type: new GraphQLList(GraphQLString) }
    }
});

const GetProductsFilterInput = new GraphQLInputObjectType({
    name: "GetProductsFilterInput",
    fields: {
        price: { type: NumberRangeFilterInput },
        amountInStock: { type: NumberRangeFilterInput },
        manufacturers: { type: StringFilterInput },
        category: { type: StringFilterInput },
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt }
    }
})

const PageProducts = (itemType) => {
    return new GraphQLObjectType({
        name: 'PageType',
        fields: () => ({
            totalCount: { type: GraphQLInt },
            products: { type: new GraphQLList(itemType) },
        })
    })
}

export { ProductType, totalStockValueType, CreateProductInput, UpdateProductInput, NumberRangeFilterInput, StringFilterInput, GetProductsFilterInput, PageProducts }