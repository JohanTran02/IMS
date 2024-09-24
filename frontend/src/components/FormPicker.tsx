import { useState } from "react";
import ManufacturerForm from "./FormManufacturer";
import Form from "./Formpage";




const FormPicker = () => {

  const [ productForm, setProductForm ] = useState(true);
  return (
    <>
      <div className="flex space-x-4 px-6 py-2">
        <div
          className={`cursor-pointer ${productForm ? "underline" : ""}`}
          onClick={() => setProductForm(true)}
        >
          Product info
        </div>
        <div
          className={`cursor-pointer ${!productForm ? "underline" : ""}`}
          onClick={() => setProductForm(false)}
        >
          Manufacturer info
        </div>
      </div>
      <div className="px-4">
        {productForm ? <Form /> : <ManufacturerForm />}
      </div>
    </>
  );
}

export default FormPicker
