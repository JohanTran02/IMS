import { faker } from "@faker-js/faker";
import { Product } from "./models/models";
import { connectToDB } from "./connect";
import mongoose from "mongoose";
import { IManufacturer } from "./resources/manufacturer/types";
import { IProduct } from "./resources/product/types";

connectToDB()

function generateData(): IProduct[] {
    const array: IProduct[] = [];

    for (let i = 0; i <= 1000; i++) {
        const fakeProduct = createRandomProduct();
        array.push(fakeProduct);
    }

    return array;
}

function createRandomProduct(): IProduct {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        sku: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        category: faker.commerce.product(),
        manufacturer: createRandomManufacturer(),
        amountInStock: parseInt(faker.finance.amount({ dec: 0 })),
    }
}

function createRandomManufacturer(): IManufacturer {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        country: faker.location.country(),
        website: faker.internet.domainName(),
        address: faker.location.streetAddress(),
        contact: {
            name: faker.person.firstName(),
            phone: faker.phone.number({ style: "international" }),
            email: faker.internet.exampleEmail()
        }
    }
}

const fakeData = generateData()

//Generera testdata
// await Product.insertMany(fakeData).then(() => {
//     console.log("Succesfully saved products");
//     mongoose.connection.close();
//     process.exit(0);
// }).catch((err) => console.log(err));

//Ta bort testdata
await Product.deleteMany({}).then(() => {
    console.log("Succesfully removed all products");
    mongoose.connection.close();
    process.exit(0);
}).catch((err) => console.log(err));