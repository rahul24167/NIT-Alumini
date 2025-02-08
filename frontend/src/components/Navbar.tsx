import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Navbar = () => {
  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const loginCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("login="))
      ?.split("=")[1];
    setCookie(loginCookie);
  }, [document.cookie]);
  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/user/auth/logout`,
        {
          withCredentials: true,
        }
      );
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
  const navigateHome = async () => {
    navigate("/");
  }
  return (
    <div className="navbar glass sticky top-0 z-50">
      <div className="flex-1">
        <button onClick={navigateHome} className="btn btn-ghost btn-outline">
          <img className="object-contain h-11" src="/nit-logo.png" alt="nit srinagar logo" />
        </button>
      </div>
      <div className="flex-none">
        {cookie ? (
            <button onClick={logoutHandler} className="btn btn-primary">
              Sign Out
            </button>
        ) : (
          <ul className="flex space-x-4">
            <button onClick={navigateSignin} className="btn btn-primary">
              Sign In
            </button>
            <button onClick={navigateSignup} className="btn btn-primary">
              Sign Up
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
