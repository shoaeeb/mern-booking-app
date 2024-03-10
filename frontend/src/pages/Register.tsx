import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Created Account Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/"); //navigate to home page after registration
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    //on submit,call the mutation function
    mutation.mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Create A Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          First Name
          <input
            className="w-full py-1 px-2 border rounded"
            {...register("firstName", {
              required: "This field is required",
            })}
          ></input>
          {errors.firstName && (
            <span className="text-sm text-red-800">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="w-full py-1 px-2 border rounded"
            {...register("lastName", {
              required: "This field is required",
            })}
          ></input>
          {errors.lastName && (
            <span className="text-sm text-red-800 ">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="w-full py-1 px-2 border rounded"
          {...register("email", {
            required: "This field is required",
          })}
        ></input>
        {errors.email && (
          <span className="text-sm text-red-800 ">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="w-full py-1 px-2 border rounded"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-sm text-red-800 ">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="w-full py-1 px-2 border rounded"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-sm text-red-800 ">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="flex justify-between">
        <span className="text-gray-700 text-xs flex items-center justify-center gap-1">
          Already have a account?
          <Link className="underline" to="/sign-in">
            Sign In
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 text-xl font-bold hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
