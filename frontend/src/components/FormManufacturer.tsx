import { useForm } from "react-hook-form";
const ManufacturerForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className="bg-slate-500 p-4 rounded-lg max-w-[40%] max-h-[500px] space-y-4 overflow-hidden">
      {/* Manufacturer Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-white text-sm font-medium">
          Manufacturer Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder="Enter manufacturer name"
          className="w-full p-1 rounded-md border border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Manufacturer name is required</p>
        )}
      </div>

      {/* Manufacturer Address */}
      <div className="space-y-1">
        <label
          htmlFor="address"
          className="block text-white text-sm font-medium"
        >
          Manufacturer Address
        </label>
        <input
          id="address"
          {...register("address", { required: true })}
          placeholder="Enter manufacturer address"
          className="w-full p-1 rounded-md border border-gray-300"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            Manufacturer address is required
          </p>
        )}
      </div>

      {/* Manufacturer Country and Website */}
      <div className="flex gap-2">
        <div className="w-1/2 space-y-1">
          <label
            htmlFor="country"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Country
          </label>
          <input
            id="country"
            {...register("country", { required: true })}
            placeholder="Enter country"
            className="w-full p-1 rounded-md border border-gray-300"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">Country is required</p>
          )}
        </div>

        <div className="w-1/2 space-y-1">
          <label
            htmlFor="website"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Website
          </label>
          <input
            id="website"
            {...register("website", { required: true })}
            placeholder="Enter website URL"
            className="w-full p-1 rounded-md border border-gray-300"
          />
          {errors.website && (
            <p className="text-red-500 text-sm">Website is required</p>
          )}
        </div>
      </div>

      {/* Description and Contact Section */}
      <div className="flex gap-2">
        {/* Manufacturer Description */}
        <div className="w-1/2 space-y-1">
          <label
            htmlFor="description"
            className="block text-white text-sm font-medium"
          >
            Manufacturer Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            placeholder="Enter manufacturer description"
            className="w-full p-1 rounded-md border border-gray-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Contact Section */}
        <div className="w-1/2 space-y-2">
          {/* Contact Name */}
          <div className="space-y-1">
            <label
              htmlFor="contactName"
              className="block text-white text-sm font-medium"
            >
              Contact Name
            </label>
            <input
              id="contactName"
              {...register("contactName", { required: true })}
              placeholder="Enter contact name"
              className="w-full p-1 rounded-md border border-gray-300"
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm">Contact name is required</p>
            )}
          </div>

          {/* Contact Email */}
          <div className="space-y-1">
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
              placeholder="Enter contact email"
              className="w-full p-1 rounded-md border border-gray-300"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm">Contact email is required</p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="space-y-1">
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
              placeholder="Enter contact phone number"
              className="w-full p-1 rounded-md border border-gray-300"
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
