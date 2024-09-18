import { IManufacturer } from "../manufacturer/types";

export interface IProduct {
    name: string,
    sku: string,
    description: string,
    price: number,
    category: string,
    manufacturer: IManufacturer,
    amountInStock: number
}