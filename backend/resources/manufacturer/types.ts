import { IContact } from "../contact/types";

export interface IManufacturer {
    _id: String,
    name: String,
    description: String,
    country: String,
    website: String,
    address: String,
    contact: IContact
}