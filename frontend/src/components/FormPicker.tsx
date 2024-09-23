import { useState } from "react";
import ManufacturerForm from "./FormManufacturer";
import Form from "./Formpage";




const FormPicker = () => {

  const [ productForm, setProductForm ] = useState(true);
  return (
    <>
      <div className="flex space-x-4">
        <div
          className="pointer-cursor"
          onClick={() => setProductForm(!productForm)}
        >
          Product info
        </div>
        <div
          className="pointer-cursor"
          onClick={() => setProductForm(!productForm)}
        >
          Manufacturer info
        </div>

      </div>
        {productForm ? <Form /> : <ManufacturerForm />}
    </>
  );
}

export default FormPicker
