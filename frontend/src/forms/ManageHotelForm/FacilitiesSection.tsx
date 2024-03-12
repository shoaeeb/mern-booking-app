import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-config-options";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold">Facilities</h2>

      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (value) => {
                  if (value.length > 0) {
                    return true;
                  } else {
                    return "Please Select at least one facility";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};
export default FacilitiesSection;
