import { gql, useQuery } from "@apollo/client";
import { useState } from "react"
import { IProduct } from "../../backend/resources/product/types.ts"

const GET_PRODUCTS = gql`
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

// name: string,
// sku: string,
// description: string,
// price: number,
// category: string,
// manufacturer: IManufacturer,
// amountInStock: number

function App() {
    const [activeTab, setActiveTab] = useState<"product" | "manufacturer">("product");
    const { error, loading, data: { product: { products } = { products: [] } } = {} } = useQuery<{ product: { products: IProduct[] } }>(GET_PRODUCTS, {
        variables: { limit: 10 }
    })

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

    console.log(products);
    const product = products[2];

    return (
        <main className="flex flex-row h-screen max-h-screen w-screen">
            <nav className="bg-red-300 flex flex-col px-4 pt-2">
                <a href="#">Overview</a>
                <a href="#">Products</a>
                <a href="#">Management</a>
            </nav>
            <div className="bg-blue-300 w-full p-3 flex flex-col gap-4">
                <div className="bg-green-300 h-40 flex">Product details</div>
                <div className="bg-purple-300 flex-1 flex gap-4 ">
                    <div className="bg-amber-400 flex flex-col flex-1 gap-4 w-0">
                        <div className="bg-teal-300 flex gap-3">
                            <p className={activeTab === "product" ? "underline" : ""} onClick={() => setActiveTab("product")}>Product info</p>
                            <p className={activeTab === "manufacturer" ? "underline" : ""} onClick={() => setActiveTab("manufacturer")}>Manufacturer info</p>
                        </div>
                        {
                            activeTab === "product" ? <>
                                <input type="text" disabled value={`${product.name}`} className="h-12" />
                                <input type="text" disabled value={`${product.category}`} className="h-12" />
                                <div className="flex gap-4">
                                    <input type="text" disabled value={`${product.price}`} className="h-12 flex-1 w-0" />
                                    <input type="text" disabled value={`${product.amountInStock}`} className="h-12 flex-1 w-0" />
                                </div>
                                <textarea disabled value={`${product.description}`} className="resize-none h-[200px]" />
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

            </div>
        </main>
    )
}

export default App
