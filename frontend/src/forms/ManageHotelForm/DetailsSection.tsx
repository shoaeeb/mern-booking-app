import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add Hotel</h1>
      <label className="text-sm text-gray-700 font-bold space-y-1 flex-1">
        Name
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          {...register("name", {
            required: "This field is required",
          })}
        ></input>
        {errors.name && (
          <span className="text-red-700">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-2 flex-col md:flex-row">
        <label className="text-sm text-gray-700 font-bold space-y-1 flex-1">
          City
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            {...register("city", {
              required: "This field is required",
            })}
          ></input>
          {errors.city && (
            <span className="text-red-700">{errors.city.message}</span>
          )}
        </label>
        <label className="text-sm text-gray-700 font-bold space-y-1 flex-1">
          Country
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            {...register("country", {
              required: "This field is required",
            })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-700">{errors.pricePerNight.message}</span>
          )}
        </label>
      </div>
      <label className="text-sm text-gray-700 font-bold space-y-1 flex-1">
        Description
        <textarea
          className="w-full border rounded px-2 py-1"
          rows={5}
          {...register("description", {
            required: "This field is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-700">{errors.description.message}</span>
        )}
      </label>
      <label className="text-sm text-gray-700 font-bold space-y-1 max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="w-full border rounded px-2 py-1"
          {...register("pricePerNight", {
            required: "This field is required",
          })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-700">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-sm text-gray-700 font-bold space-y-1 max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className={"w-full p-2 border rounded text-gray-700 font-normal"}
        >
          <option value={""} className="text-sm font-bold">
            Select as Star Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.pricePerNight && (
          <span className="text-red-700">{errors.pricePerNight.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
