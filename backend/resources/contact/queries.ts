// import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
// import { Contact } from "../../models/models";
// import { ContactType } from "../../models/schema";

// export const contactQuery = new GraphQLObjectType({
//     name: "ContactQuery",
//     fields: () => ({
//         contacts: {
//             type: new GraphQLList(ContactType),
//             resolve: async () => {
//                 return await Contact.find({});
//             }
//         },
//         contact: {
//             type: new GraphQLList(ContactType),
//             args: { name: { type: GraphQLString } },
//             resolve: async (_, args) => {
//                 return await Contact.find({ name: args.name });
//             }
//         }
//     })
// })
