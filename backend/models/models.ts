import { mongoose } from "../connect"
import { IContact } from "../resources/contact/types";
import { IManufacturer } from "../resources/manufacturer/types";
import { IProduct } from "../resources/product/types";

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