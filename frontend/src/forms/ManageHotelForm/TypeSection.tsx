import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-config-options";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm font-semibold px-4 py-2 rounded-full"
                : "cursor-pointer bg-gray-300 text-sm font-semibold px-4 py-2 rounded-full "
            }
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span className="text-sm">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-700">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
