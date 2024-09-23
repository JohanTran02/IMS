import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { useState } from "react";
import { IProduct } from "../../../backend/resources/product/types";

interface IProductVars {
    limit: number
}

const GET_PRODUCTS: TypedDocumentNode<IProduct[], IProductVars> = gql`
    query RootQuery($limit : Int) {  
        product{
            products(limit: $limit){
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
    const [activeTab, setActiveTab] = useState<"product" | "manufacturer">("product");
    const { error, loading, data = [] } = useQuery(GET_PRODUCTS, {
        variables: { limit: 10 }
    })

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

    console.log(data)

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
                            <input type="text" disabled value={`${data[0].name}`} className="h-12" />
                            <input type="text" disabled value={`${data[0].category}`} className="h-12" />
                            <div className="flex gap-4">
                                <input type="text" disabled value={`${data[0].price}`} className="h-12 flex-1 w-0" />
                                <input type="text" disabled value={`${data[0].amountInStock}`} className="h-12 flex-1 w-0" />
                            </div>
                            <textarea disabled value={`${data[0].description}`} className="resize-none h-[200px]" />
                        </> :
                            <>
                                <input type="text" disabled value={"Manufacturer name"} className="h-12" />
                                <input type="text" disabled value={"Manufacturer website"} className="h-12" />
                                <div className="flex flex-row gap-4">
                                    <input type="text" disabled value={"Manufacturer address"} className="h-12 flex-1 w-0" />
                                    <input type="text" disabled value={"Manufacturer country"} className="h-12 flex-1 w-0" />
                                </div>
                                <div className="flex gap-4">
                                    <textarea disabled value={"Manufacturer description"} className="resize-none h-[200px] flex-1 w-0" />
                                    <div className="flex flex-col flex-1 w-0">
                                        <h1 className="text-lg font-bold">Contact</h1>
                                        <input type="text" disabled value={"Manufacturer name"} className="h-full" />
                                        <input type="text" disabled value={"Manufacturer email"} className="h-full" />
                                        <input type="text" disabled value={"Manufacturer phone number"} className="h-full" />
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