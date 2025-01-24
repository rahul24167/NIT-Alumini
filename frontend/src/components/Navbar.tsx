import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }, []);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://treehouse.software/api/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Logout successful");
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
    <div className={className}>
      Navbar
      <div>
        {cookie ? (
          <div>
            <button onClick={logoutHandler}>signout</button>
          </div>
        ) : (
          <div>
            <button onClick={navigateSignin}>signin </button>
            <button onClick={navigateSignup}>signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
