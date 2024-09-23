import { IManufacturer } from "../manufacturer/types";

interface IProduct {
    name: string,
    sku: string,
    description: string,
    price: number,
    category: string,
    manufacturer: IManufacturer,
    amountInStock: number
}

interface NumberRangeFilter {
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number
}

interface NumberRangeQuery {
    $gt?: number;
    $gte?: number;
    $lt?: number;
    $lte?: number
}

type IGetProductFilterInput = Partial<{
    price: NumberRangeFilter,
    amountInStock: NumberRangeFilter,
    manufacturers: { value: string[] },
    category: { value: string[] },
    limit: number,
    page: number,
}>

type ProductQuery = Partial<{
    price: NumberRangeQuery;
    amountInStock: NumberRangeQuery;
    category: { $in: RegExp[] };
    'manufacturer.name': { $in: RegExp[] };
}>

export { IProduct, NumberRangeFilter, NumberRangeQuery, IGetProductFilterInput, ProductQuery }