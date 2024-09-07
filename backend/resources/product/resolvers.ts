import { Product } from "../../models/models"

//TODO #25 Import the interface instead of defining it in every file @JohanTran02
interface IContact {
    name: String,
    email: String,
    phone: String
}

interface IManufacturer {
    _id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contact: IContact
}

interface IProduct {
    _id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    manufacturer: IManufacturer,
    amountInStock: Number
}

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

export const getManufacturers = async (): Promise<IManufacturer[]> => {
    const products: IProduct[] = await Product.aggregate([{ $project: { manufacturer: 1 } }])
    const manufacturers = products.map(product => product.manufacturer)
    return manufacturers;
}