import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { useState } from "react";
import { IProduct } from "../../../backend/resources/product/types";
import { useParams } from "react-router";

interface IProductData {
    product: {
        product: IProduct
    }
}

interface IProductVars {
    sku: string | undefined
}

const GET_PRODUCT: TypedDocumentNode<IProductData, IProductVars> = gql`
    query RootQuery($sku : String) {  
        product{
            product(sku: $sku){
            name
            sku
            description
            price
            category
            amountInStock
                manufacturer{
                    name
                    description
                    website
                    address
                    country
                    contact{
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
    const [activeTab, setActiveTab] = useState<"product" | "manufacturer">("product");

    const { error, loading, data } = useQuery<IProductData, IProductVars>(GET_PRODUCT, {
        variables: { sku: sku }
    })

    const product = data?.product?.product || {} as IProduct;

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <div className="bg-purple-300 flex-1 flex gap-4 ">
                <div className="bg-amber-400 flex flex-col flex-1 gap-4 w-0">
                    <div className="bg-teal-300 flex gap-3">
                        <p className={activeTab === "product" ? "underline" : ""} onClick={() => setActiveTab("product")}>Product info</p>
                        <p className={activeTab === "manufacturer" ? "underline" : ""} onClick={() => setActiveTab("manufacturer")}>Manufacturer info</p>
                    </div>
                    {
                        activeTab === "product" ? <>
                            <input type="text" disabled={!isinEdit} value={`${product.name}`} className="h-12" />
                            <input type="text" disabled={!isinEdit} value={`${product.category}`} className="h-12" />
                            <div className="flex gap-4">
                                <input type="text" disabled={!isinEdit} value={`${product.price}`} className="h-12 flex-1 w-0" />
                                <input type="text" disabled={!isinEdit} value={`${product.amountInStock}`} className="h-12 flex-1 w-0" />
                            </div>
                            <textarea disabled={!isinEdit} value={`${product.description}`} className="resize-none h-[200px]" />
                        </> :
                            <>
                                <input type="text" disabled={!isinEdit} value={`${product.manufacturer.name}`} className="h-12" />
                                <input type="text" disabled value={`${product.manufacturer.website}`} className="h-12" />
                                <div className="flex flex-row gap-4">
                                    <input type="text" disabled value={`${product.manufacturer.address}`} className="h-12 flex-1 w-0" />
                                    <input type="text" disabled value={`${product.manufacturer.country}`} className="h-12 flex-1 w-0" />
                                </div>
                                <div className="flex gap-4">
                                    <textarea disabled value={`${product.manufacturer.description}`} className="resize-none h-[200px] flex-1 w-0" />
                                    <div className="flex flex-col flex-1 w-0">
                                        <h1 className="text-lg font-bold">Contact</h1>
                                        <input type="text" disabled value={`${product.manufacturer.contact.name}`} className="h-full" />
                                        <input type="text" disabled value={`${product.manufacturer.contact.email}`} className="h-full" />
                                        <input type="text" disabled value={`${product.manufacturer.contact.phone}`} className="h-full" />
                                    </div>
                                </div>
                            </>
                    }

                  
                </div>
                <div className="bg-lime-300 flex flex-col flex-1 w-0 gap-4">
                    <div className="bg-cyan-300 h-[150px]">Total stock value diagram</div>
                    <div className="bg-cyan-300 h-[150px]">Total price diagram</div>
                    <div className="bg-cyan-300 h-[150px]">Total amount in stock diagram</div>
                </div>
            </div>

        </>
    )
}