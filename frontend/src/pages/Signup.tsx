import { useState } from "react"
import { BACKEND_URL } from "../config"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [result, setResult] = useState(false)
  const signupHandler = async (e:React.FormEvent)=>{
    e.preventDefault();
    const response= await axios.post(`${BACKEND_URL}/api/v1/user/auth/signup`, {name, email, password, confirmPassword},{withCredentials:true})
    if (response.status === 200){
      console.log(response.data)
      setResult(true)
    }
  }

  return (
    <>
    {result ? (
  <div className="text-center bg-green-100 text-green-700 p-4 rounded-md shadow-md">
    Verification link has been sent to your email. If not found, check your spam folder.
  </div>
) : (
  <div className="flex flex-col items-center bg-slate-500 text-white min-h-screen p-6">
    <h1 className="text-2xl font-bold mb-6">Signup</h1>
    <form
      onSubmit={signupHandler}
      className="bg-white text-gray-800 p-6 rounded-md shadow-md w-full max-w-md"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
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
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block font-semibold mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition"
      >
        Sign Up
      </button>
    </form>
  </div>
)}

</>
  )
}

export default Signup