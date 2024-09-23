import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { Home } from "./home/Home"
import { ProductDetails } from "./products/ProductDetails"
import { ProductEdit } from "./products/ProductEdit"
import { ProductLayout } from "./products/ProductLayout"
import { Products } from "./products/Products"

function App() {
    return (
        <BrowserRouter>
            <main className="flex flex-row h-screen max-h-screen w-screen">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/products" >
                            <Route index element={<Products />} />
                            <Route element={<ProductLayout />}>
                                <Route path=":sku" element={<ProductDetails />} />
                                <Route path="edit" element={<ProductEdit />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
