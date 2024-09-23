import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <form className="bg-slate-500 p-4 rounded-lg max-w-[40%] max-h-[500px] space-y-4 overflow-hidden">
      {/* onSubmit={handleSubmit(onSubmit)} */}

      {/* Name Field */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-white text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder="Enter product name"
          className="w-full p-1 rounded-md border border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}
      </div>

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
          placeholder="Enter category"
          className="w-full p-1 rounded-md border border-gray-300"
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
            placeholder="Enter price"
            className="w-full p-1 rounded-md border border-gray-300"
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
            placeholder="Enter stock amount"
            className="w-full p-1 rounded-md border border-gray-300"
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
          placeholder="Enter product description"
          className="w-full p-1 rounded-md border border-gray-300"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
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


export default Form;
