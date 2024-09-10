//TODO #25 Import the interface instead of defining it in every file @JohanTran02
import { IManufacturer } from "../manufacturer/types";

export interface IProduct {
    _id: string,
    name: string,
    sku: string,
    description: string,
    price: number,
    category: string,
    manufacturer: IManufacturer,
    amountInStock: number
}