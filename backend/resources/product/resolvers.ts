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

export const getTotalStockValueByManufacturer = async (manufacturerName: string) => {
    return await Product.aggregate([{ $match: { "manufacturer.name": manufacturerName } },
    { $project: { price: 1, amountInStock: 1, total: { $multiply: ["$price", "$amountInStock"] } } }, {
        $group: {
            _id: null,
            total: {
                $sum: "$total"
            }
        }
    }])
}

export const getlowStockProducts = async () => {
    return await Product.find({}).where("amountInStock").lt(10);
}

export const getCriticalStockProducts = async () => {
    return await Product.find({}).where("amountInStock").lt(5);
}