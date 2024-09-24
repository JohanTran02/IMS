import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { useState } from "react";
import { IProduct } from "../../../backend/resources/product/types";
import { useNavigate, useParams } from "react-router";

interface IProductData {
    product: {
        product: IProduct;
    };
}

interface IProductVars {
    sku: string | undefined;
}

const GET_PRODUCT: TypedDocumentNode<IProductData, IProductVars> = gql`
  query RootQuery($sku: String) {
    product {
      product(sku: $sku) {
        name
        sku
        description
        price
        category
        amountInStock
        manufacturer {
          name
          description
          website
          address
          country
          contact {
            name
            phone
            email
          }
        }
      }
    }
  }
`;

export function ProductDetails() {
    const { sku } = useParams();
    const navigate = useNavigate();

    const { error, loading, data } = useQuery<IProductData, IProductVars>(GET_PRODUCT, {
        variables: { sku: sku }
    })

    const product = data?.product?.product || {} as IProduct;

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <div className="bg-white flex-1 flex gap-4 ">
                <div className="flex-1">
                    <div className="bg-blue-200 flex gap-3 py-4 px-4">
                        <h1 className={"flex-1 font-bold text-2xl"}>Product info</h1>
                        <h1 className={"flex-1 font-bold text-2xl"}>Manufacturer info</h1>
                    </div>

                    <div className="flex gap-4 p-2 mx-2">
                        <div className="flex-1 flex flex-col gap-4">
                            <label className="flex flex-col gap-1 ">
                                Name
                                <input
                                    type="text"
                                    disabled
                                    value={`${product.name}`}
                                    className="h-[42px] border border-black p-2 rounded"
                                    readOnly
                                />
                            </label>

                            <label className="flex flex-col gap-1 ">
                                Category
                                <input
                                    type="text"
                                    disabled
                                    value={`${product.category}`}
                                    className="h-[42px] border border-black p-2 rounded"
                                    readOnly
                                />
                            </label>
                            <div className="flex gap-2 justify-between">
                                <label className="flex flex-col gap-1 ">
                                    Price
                                    <input
                                        type="text"
                                        disabled
                                        value={`${product.price}`}
                                        className="h-[42px] border border-black p-2 rounded"
                                    />
                                </label>
                                <label className="flex flex-col gap-1 ">
                                    Stock Amount
                                    <input
                                        type="text"
                                        disabled
                                        value={`${product.amountInStock}`}
                                        className="h-[42px] border border-black p-2 rounded"
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col gap-1">
                                Description
                                <textarea
                                    disabled
                                    value={`${product.description}`}
                                    className="resize-none h-[200px] border border-black p-2 rounded-[2px]"
                                    readOnly
                                />
                            </label>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 mx-2">
                            <label className="flex flex-col gap-1">
                                Name
                                <input
                                    type="text"
                                    disabled
                                    value={`${product.manufacturer.name}`}
                                    className="h-[42px] border border-black p-2 rounded"
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                Website
                                <input
                                    type="text"
                                    disabled
                                    value={`${product.manufacturer.website}`}
                                    className="h-[42px] border border-black p-2 rounded"
                                />
                            </label>
                            <div className="flex flex-row gap-2 justify-between">
                                <label className="flex flex-col gap-1">
                                    Adress
                                    <input
                                        type="text"
                                        disabled
                                        value={`${product.manufacturer.address}`}
                                        className="h-[42px] border border-black p-2 rounded"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    Country
                                    <input
                                        type="text"
                                        disabled
                                        value={`${product.manufacturer.country}`}
                                        className="h-[42px] border border-black p-2 rounded"
                                    />
                                </label>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex flex-col gap-1 flex-1">
                                    Description
                                    <textarea
                                        disabled
                                        value={`${product.manufacturer.description}`}
                                        className="resize-none h-[200px] border border-black p-2 rounded-[2px]"
                                    />
                                </label>
                                <div className="flex flex-col flex-1 gap-[5px] p-2">
                                    <label className="flex flex-col gap-1">
                                        Contact
                                        <input
                                            type="text"
                                            disabled
                                            value={`${product.manufacturer.contact.name}`}
                                            className="h-[42px] border border-black p-2 rounded"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        Email
                                        <input
                                            type="text"
                                            disabled
                                            value={`${product.manufacturer.contact.email}`}
                                            className="h-[42px] border border-black p-2 rounded"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        Phone
                                        <input
                                            type="text"
                                            disabled
                                            value={`${product.manufacturer.contact.phone}`}
                                            className="h-[42px] border border-black p-2 rounded"
                                        />
                                    </label>
                                    <button onClick={() => navigate(`/products/edit/${sku}`)}>Edit Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
