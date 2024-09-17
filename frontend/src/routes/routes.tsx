import { createBrowserRouter } from "react-router-dom";


import App from "../App.tsx";
import EditProducts from "../pages/editProducts.tsx";
import EditManufacturer from "../pages/editManufacturer.tsx";


 const router = createBrowserRouter([
  {path: "/",
    element: <App/>
  },
  
    {
     path: "/products/editProducts",
     element: <EditProducts/>,
   },
      {
     path: "/products/editManufacturer",
     element: <EditManufacturer/>,
   },
])

export default router