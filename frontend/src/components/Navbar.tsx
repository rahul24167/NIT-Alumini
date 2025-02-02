import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface NavbarProps {
  className: string;
}
const Navbar = ({ className }: NavbarProps) => {
  const [cookie, setCookie] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loginCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("login="))
      ?.split("=")[1];
    setCookie(loginCookie);
  }, [document.cookie]);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Logout successful");
        setCookie(undefined);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setCookie(undefined);
    }
  };
  const navigateSignin = async () => {
    navigate("/signin");
  };
  const navigateSignup = async () => {
    navigate("/signup");
  };
  return (
    <div className={`flex items-center justify-between px-6 py-4 bg-gray-800 text-white ${className}`}>
    <div className="text-xl font-bold">NIT Srinagar Alumini</div>
    <div>
      {cookie ? (
        <div>
          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={navigateSignin}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            Sign In
          </button>
          <button
            onClick={navigateSignup}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Navbar;
