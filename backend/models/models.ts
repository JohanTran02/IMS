import { mongoose } from "../connect"

const contactSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: Number
});

const manufacturerSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contacts: { type: mongoose.SchemaTypes.ObjectId, contactSchema }
});

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    manufacturer: { type: mongoose.SchemaTypes.ObjectId, manufacturerSchema },
    amountInStock: Number
})


const Contact = mongoose.model("Contact", contactSchema);
const Product = mongoose.model("Product", productSchema);
const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

export { Contact, Product, Manufacturer }