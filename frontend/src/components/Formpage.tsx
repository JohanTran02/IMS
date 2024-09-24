import { useForm } from "react-hook-form";

import { gql, TypedDocumentNode, useQuery } from "@apollo/client";

import { IProduct } from "../../../backend/resources/product/types";
import { useParams } from "react-router";

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

const Form = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

   const { sku } = useParams();
   

   const { error, loading, data } = useQuery<IProductData, IProductVars>(
     GET_PRODUCT,
     {
       variables: { sku: sku },
     }
   );

   const product = data?.product?.product || ({} as IProduct);

   if (loading) return null;
   if (error) return `Error! ${error.message}`;


  return (
    <form className="bg-slate-500 p-4 rounded-lg max-w-[40%] h-[500px] space-y-3 overflow-y-auto">
      {/* Name Field */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-white text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder={`${product.name}` || "Enter product name"}
          className="w-full p-2 rounded-md border border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}
      </div>

      {/* Category Field */}
      <div className="space-y-1">
        <label
          htmlFor="category"
          className="block text-white text-sm font-medium"
        >
          Category
        </label>
        <input
          id="category"
          {...register("category", { required: true })}
          placeholder={`${product.category}` || "Enter product category"}
          className="w-full p-2 rounded-md border border-gray-300"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">Category is required</p>
        )}
      </div>

      {/* Price and Stock Fields */}
      <div className="flex gap-2">
        <div className="w-1/2 space-y-1">
          <label
            htmlFor="price"
            className="block text-white text-sm font-medium"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            placeholder={`${product.price}` || "Enter product product"}
            className="w-full p-2 rounded-md border border-gray-300"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
        </div>

        <div className="w-1/2 space-y-1">
          <label
            htmlFor="stock"
            className="block text-white text-sm font-medium"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            {...register("stock", { required: true })}
            placeholder={
              `${product.amountInStock}` || "Enter product stock amount"
            }
            className="w-full p-2 rounded-md border border-gray-300"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">Stock amount is required</p>
          )}
        </div>
      </div>

      {/* Description Field */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-white text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          placeholder={`${product.description}` || "Enter product description"}
          className="w-full p-2 rounded-md border border-gray-300 h-36 resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full  bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
