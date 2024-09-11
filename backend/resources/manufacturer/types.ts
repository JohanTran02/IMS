import { IContact } from "../contact/types";

export interface IManufacturer {
    _id: string,
    name: string,
    description: string,
    country: string,
    website: string,
    address: string,
    contact: IContact
}