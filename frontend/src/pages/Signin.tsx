import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Signin = () => {
  const [cookie] = useState(document.cookie.split("; ") 
  .find((row) => row.startsWith("login="))?.split("=")[1]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie) {
      navigate("/");
    }
  }, [cookie]);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/auth/signin`,
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data);
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 text-white p-6">
  <h1 className="text-2xl font-bold mb-6">Signin</h1>
  <form
    onSubmit={signinHandler}
    className="bg-white text-gray-800 p-6 rounded-md shadow-md w-full max-w-md"
  >
    <div className="mb-4">
      <label htmlFor="email" className="block font-semibold mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block font-semibold mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition"
    >
      Sign In
    </button>
  </form>
</div>

  );
};

export default Signin;
