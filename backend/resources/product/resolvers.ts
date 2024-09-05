import { Product } from "../../models/models"

export const getProducts = async () => {
    return await Product.find({});
}

export const getProduct = async (_id: string) => {
    return await Product.findById(_id);
}

export const getTotalStockValue = async () => {
    return await Product.aggregate([{ $project: { price: 1, amountInStock: 1, total: { $multiply: ["$price", "$amountInStock"] } } }, {
        $group: {
            _id: null, //Gruppera baserat på fields i documents på collections. Null är default value och tar istället in alla värden som kommer in till group.
            total: {
                $sum: "$total"
            }
        }
    }])
}