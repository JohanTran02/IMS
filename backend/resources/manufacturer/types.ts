import { IContact } from "../contact/types";

export interface IManufacturer {
    name: string,
    description: string,
    country: string,
    website: string,
    address: string,
    contact: IContact
}