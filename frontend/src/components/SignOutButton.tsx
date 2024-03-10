import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      showToast({ message: "Sign Out Succesfully", type: "SUCCESS" });
      ///invalidate the validateToken query to refetch the user status
      //to make sure the user is logged out
      queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="text-blue-800 font-bold font-xs bg-white px-3 hover:bg-gray-500"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
