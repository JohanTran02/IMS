import { GraphQLList, GraphQLObjectType } from "graphql";
import { Manufacturer } from "../../models/models";
import { ManufacturerType } from "../../models/schema";

export const manufacturerQuery = new GraphQLObjectType({
    name: "manufacturerQuery",
    fields: () => ({
        contacts: {
            type: new GraphQLList(ManufacturerType),
            resolve: async () => {
                return await Manufacturer.find({});
            }
        }
    })
})
