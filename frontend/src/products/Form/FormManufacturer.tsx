import { useForm } from "react-hook-form";

import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { IProduct } from "../../../../backend/resources/product/types";
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


const ManufacturerForm = () => {
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
    <form className="bg-slate-500 p-2 rounded-lg max-w-[40%] h-[500px] space-y-3 ">
      {/* Manufacturer Name */}
      <div>
        <label htmlFor="name" className="block text-white text-sm font-medium">
          Manufacturer Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder={
            `${product.manufacturer.name}` || "Enter manufacturer name"
          }
          className="w-full p-2 rounded-md border border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Manufacturer name is required</p>
        )}
      </div>

      {/* Manufacturer Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-white text-sm font-medium"
        >
          Manufacturer Address
        </label>
        <input
          id="address"
          {...register("address", { required: true })}
          placeholder={
            `${product.manufacturer.address}` || "Enter manufacturer address"
          }
          className="w-full p-2 rounded-md border border-gray-300"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            Manufacturer address is required
          </p>
        )}
      </div>

      {/* Manufacturer Country and Website */}
      <div className="flex gap-2">
        <div className="w-1/2 ">
          <label
            htmlFor="country"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Country
          </label>
          <input
            id="country"
            {...register("country", { required: true })}
            placeholder={
              `${product.manufacturer.country}` || "Enter manufacturer country"
            }
            className="w-full p-2 rounded-md border border-gray-300"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">Country is required</p>
          )}
        </div>

        <div className="w-1/2 ">
          <label
            htmlFor="website"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Website
          </label>
          <input
            id="website"
            {...register("website", { required: true })}
            placeholder={
              `${product.manufacturer.website}` || "Enter manufacturer website"
            }
            className="w-full p-2 rounded-md border border-gray-300"
          />
          {errors.website && (
            <p className="text-red-500 text-sm">Website is required</p>
          )}
        </div>
      </div>

      {/* Description and Contact Section */}
      <div className="flex gap-2">
        {/* Manufacturer Description */}
        <div className="w-1/2 ">
          <label
            htmlFor="description"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            placeholder={
              `${product.manufacturer.description}` ||
              "Enter manufacturer description"
            }
            className="w-full p-2 h-44 resize-none rounded-md border border-gray-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Contact Section */}
        <div className="w-1/2 space-y-1">
          {/* Contact Name */}
          <div className="">
            <label
              htmlFor="contactName"
              className="block text-white text-sm font-medium"
            >
              Contact Name
            </label>
            <input
              id="contactName"
              {...register("contactName", { required: true })}
              placeholder={
                `${product.manufacturer.contact.name}` || "Enter contact name"
              }
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm">Contact name is required</p>
            )}
          </div>

          {/* Contact Email */}
          <div className="">
            <label
              htmlFor="contactEmail"
              className="block text-white text-sm font-medium"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              {...register("contactEmail", { required: true })}
              placeholder={
                `${product.manufacturer.contact.email}` || "Enter contact email"
              }
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm">Contact email is required</p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label
              htmlFor="contactPhone"
              className="block text-white text-sm font-medium"
            >
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              {...register("contactPhone", { required: true })}
              placeholder={
                `${product.manufacturer.contact.phone}` || "Enter contact phone number"
              }
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm">Contact phone is required</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ManufacturerForm;
