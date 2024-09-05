import { Schema, Types } from "mongoose";
import { mongoose } from "../connect"

interface IContact {
    id: String,
    name: String,
    email: String,
    phone: Number
}

interface IManufacturer {
    id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contact: IContact
}

interface IProduct {
    id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    manufacturer: Types.ObjectId,
    amountInStock: Number
}

const manufacturerSchema = new mongoose.Schema<IManufacturer>({
    id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contact: {} as IContact
});

const productSchema = new mongoose.Schema<IProduct>({
    id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
    amountInStock: Number
})

const Product = mongoose.model("Product", productSchema);
const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

export { Product, Manufacturer }