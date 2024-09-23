import { Product } from "../../models/models"
import { IManufacturer } from "../manufacturer/types";
import { IProduct, IGetProductFilterInput, ProductQuery, NumberRangeFilter, NumberRangeQuery } from "./types";
import { faker } from "@faker-js/faker";

export const getProducts = async (input: IGetProductFilterInput) => {
    if (!input) return await Product.find().limit(0);

    const { amountInStock, price, category, manufacturers, limit, page } = input;
    const productLimit = limit ?? 0;
    const pageOffset = page ?? 1;

    const query: ProductQuery = {};

    if (amountInStock && Object.keys(amountInStock).length > 0) {
        query.amountInStock = setNumberRange(amountInStock)
    }

    if (price && Object.keys(price).length > 0) {
        query.price = setNumberRange(price)
    }

    if (category?.value && category?.value.length > 0) {
        query.category = { $in: setFilteredCategories(category.value) };
    }

    if (manufacturers?.value && manufacturers?.value.length > 0) {
        query['manufacturer.name'] = { $in: setFilteredCategories(manufacturers.value) };
    }

    return await Product.find(query).limit(productLimit).skip(pageOffset * productLimit);
}

function setFilteredCategories(filters: string[]): RegExp[] {
    return filters
        .filter(categoryItem => categoryItem.trim() !== "")
        .map(categoryItem => new RegExp(`${categoryItem}`, "i"))
}

function setNumberRange(numberRange: NumberRangeFilter): NumberRangeQuery {
    const query: NumberRangeQuery = {}

    const operatorMapping: Record<string, string> = {
        gt: "$gt",
        gte: "$gte",
        lt: "$lt",
        lte: "$lte",
    };

    //Ex. [operatorMapping[gt]] = $gt. 
    for (const [operator, value] of Object.entries(numberRange)) {
        if (value !== undefined && !isNaN(Number(value))) {
            // Ex. query[operatorMapping[operator]] = ($gt = value)
            query[operatorMapping[operator]] = Number(value);
            console.log(operator, operatorMapping, operatorMapping[operator])
        }
    }

    return query;
}


export const getProduct = async (sku: string) => {
    return await Product.findOne({ sku: sku });
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

export const addProduct = async (input) => {
    const newProduct = {
        name: input.name,
        sku: input.sku || faker.commerce.isbn(),
        description: input.description || "",
        price: input.price,
        category: input.category || "",
        manufacturer: {
            name: input.manufacturer.name,
            description: input.manufacturer.description || "",
            country: input.manufacturer.country,
            address: input.manufacturer.address,
            contact: {
                name: input.manufacturer.contact.name,
                email: input.manufacturer.contact.email
            }
        },
        amountInStock: input.amountInStock || 0
    }

    return await Product.create(newProduct);
}

export const deleteProduct = async (_id) => {
    return await Product.findByIdAndDelete(_id)
}

export const updateProduct = async (_id, input) => {
    return await Product.findByIdAndUpdate(_id, input, { new: true })
} 