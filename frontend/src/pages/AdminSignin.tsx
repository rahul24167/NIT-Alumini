import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

const AdminSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseData, setResponseData] = useState({ message: "" });
  const [cookie,setCookie] = useState(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("login="))
      ?.split("=")[1]
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie) {
      navigate("/");
    }
  }, [cookie]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setResponseStatus(0); // Reset error message when the user starts typing
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setResponseStatus(0); // Reset error message when the user starts typing
  };

  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/admin/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(response.data);
        setCookie((response.data as { token: string }).token);
        navigate("/admin/dashboard");
      }
      if (response.status === 403) {
        setResponseData(response.data as { message: string });
        setResponseStatus(response.status);
      }
    } catch (error) {
      console.log(error);
      setResponseData({ message: "An error occurred. Please try again." });
      setResponseStatus(500);
    } finally {
      setIsLoading(false);
    }
  };
  return responseStatus ? (
    <div className="p-4 bg-red-500 text-white rounded-md">
      <h1>{responseData.message}</h1>
    </div>
  ) : (
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
            value={email}
            onChange={handleEmailChange}
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
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminSignin;
