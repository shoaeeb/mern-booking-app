import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex bg-gray-300 p-12 gap-2">
      <label className="text-sm font-bold flex-1">
        Adult Count
        <input
          type="number"
          min={1}
          className="w-full border rounded px-2 py-1"
          {...register("adultCount", {
            required: "This field is required",
          })}
        ></input>
        {errors.adultCount && (
          <span className="text-red-700">{errors.adultCount.message}</span>
        )}
      </label>
      <label className="text-sm font-bold flex-1">
        Children Count
        <input
          type="number"
          min={1}
          className="w-full border rounded px-2 py-1"
          {...register("childCount", {
            required: "This field is required",
          })}
        ></input>
        {errors.childCount && (
          <span className="text-red-700">{errors.childCount.message}</span>
        )}
      </label>
    </div>
  );
};
export default GuestSection;
