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
    <div className="p-4 bg-red-500 rounded-md">
      <h1>{responseData.message}</h1>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Signin</h1>
      <form
        onSubmit={signinHandler}
        className="flex flex-col glass p-6 rounded-md shadow-md w-full max-w-md gap-2"
      >
          <label htmlFor="email" className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="grow"
          />
          </label>
      
        
          <label htmlFor="password" className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
            Password
         
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="grow"
          />
           </label>
      
        <button
          type="submit"
          className={`btn btn-primary${
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
