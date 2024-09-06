import { mongoose } from "../connect"

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

type ProductType = mongoose.Model<IProduct>;
type ManufacturerType = mongoose.Model<IManufacturer>;

const manufacturerSchema = new mongoose.Schema<IManufacturer, ManufacturerType>({
    _id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contact: {} as IContact
});

const productSchema = new mongoose.Schema<IProduct, ProductType>({
    _id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    // manufacturer: [{ type: Schema.Types.ObjectId, ref: "Manufacturer" }],
    manufacturer: manufacturerSchema,
    amountInStock: Number
})

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
const Product = mongoose.model<IProduct, ProductType>("Product", productSchema);

export { Product, Manufacturer }