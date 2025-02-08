import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [result, setResult] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/auth/signup`,
      user,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data);
      setResult(true);
    }
  };

  return (
    <>
      {result ? (
        <div className="text-center bg-green-100 text-green-700 p-4 rounded-md shadow-md">
          Verification link has been sent to your email. If not found, check
          your spam folder.
        </div>
      ) : (
        <div className="flex flex-col items-center bg-slate-500 min-h-screen p-6">
          <h1 className="text-2xl font-bold mb-6">Signup</h1>
          <form
            onSubmit={signupHandler}
            className="flex flex-col glass p-6 rounded-md shadow-md w-full max-w-md gap-2"
          >
            <label
              htmlFor="name"
              className="input input-bordered flex items-center gap-2"
            >
              Name
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="grow"
              />
            </label>

            <label
              htmlFor="email"
              className="input input-bordered flex items-center gap-2"
            >
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
                value={user.email}
                onChange={handleChange}
                className="grow"
              />
            </label>

            <label
              htmlFor="password"
              className="input input-bordered flex items-center gap-2"
            >
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
                value={user.password}
                onChange={handleChange}
                className="grow"
              />
            </label>

            <label
              htmlFor="confirmPassword"
              className="input input-bordered flex items-center gap-2"
            >
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
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                className="grow"
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
