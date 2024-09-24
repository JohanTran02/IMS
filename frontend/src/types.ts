export interface IContact {
  name: string;
  email: string;
  phone: string;
}

export interface IManufacturer {
  _id: string;
  name: string;
  description: string;
  country: string;
  website: string;
  address: string;
  contact: IContact;
}

export interface IProduct {
  name: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  manufacturer: IManufacturer;
  amountInStock: number;
}

export type ProductData = {
  product: {
    products: {
      products: IProduct[],
      totalCount: number
    }
  };
};
