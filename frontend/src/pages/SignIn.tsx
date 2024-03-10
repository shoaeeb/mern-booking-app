import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("Sign in Successfully");
      showToast({ message: "Sign in Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/"); //navigate to home page after sign in
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: "Sign in Failed", type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    //on submit,call the mutation function
    console.log(data);
    mutation.mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign Up</h2>
      <label className="text-gray-700 font-bold text-sm flex-1">
        Email
        <input
          type="email"
          className="w-full border rounded px-1 py-1"
          {...register("email", {
            required: "This field is required",
          })}
        ></input>
        {errors.email && (
          <span className="text-red-800">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold text-sm  flex-1">
        Password
        <input
          type="password"
          className="w-full rounded px-1 py-1 border rounded"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-800">{errors.password.message}</span>
        )}
      </label>

      <span className="flex justify-between">
        <span className="text-sm text-gray-800 flex items-center gap-1 justify-center">
          Not Registered?
          <Link className="underline text-gray-800" to="/register">
            Register
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold font-lg p-2 hover:bg-blue-500"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default SignIn;
