import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold text-white tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white font-bold flex items-center justify-center px-3 hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <Link
                className="text-white font-bold flex items-center justify-center px-3 hover:bg-blue-600"
                to="/my-booking"
              >
                My Booking
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center font-bold bg-white px-3 text-blue-600 hover:bg-gray-300"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
