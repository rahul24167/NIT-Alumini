import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/admin/signin");
  };
  return (
    <div className="bg-blue-400 text-white py-6">
    <div className="text-center text-lg font-semibold">Footer</div>
    <div className="mt-4 flex justify-center">
      <button
        onClick={handelClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition"
      >
        Login as Admin
      </button>
    </div>
  </div>
  
  );
};

export default Footer;
