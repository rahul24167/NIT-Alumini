import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/admin/signin");
  };
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>

      <button onClick={handelClick} className="btn btn-outline">
        Login as Admin
      </button>
    </footer>
  );
};

export default Footer;
