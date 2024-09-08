//TODO #25 Import the interface instead of defining it in every file @JohanTran02
import { IManufacturer } from "../manufacturer/types";

export interface IProduct {
    _id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    manufacturer: IManufacturer,
    amountInStock: Number
}