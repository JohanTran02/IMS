import { GraphQLList, GraphQLObjectType } from "graphql";
import { Contact } from "../../models/models";
import { ContactType } from "../../models/schema";

export const contactQuery = new GraphQLObjectType({
    name: "ContactQuery",
    fields: () => ({
        contacts: {
            type: new GraphQLList(ContactType),
            resolve: async () => {
                return await Contact.find({});
            }
        }
    })
})
