import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className: string;
}
const Navbar = ({ className }: NavbarProps) => {
  const [cookie, setCookie] = useState(document.cookie);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.status === 200) {
        setCookie(document.cookie);
        console.log("Logout successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
