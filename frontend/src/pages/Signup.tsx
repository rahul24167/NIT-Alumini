import { useState } from "react"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [result, setResult] = useState(false)
  const signupHandler = async (e:React.FormEvent)=>{
    e.preventDefault();
    const response= await axios.post('http://localhost:5000/api/v1/user/auth/signup', {name, email, password, confirmPassword})
    if (response.status === 200){
      console.log(response.data)
      setResult(true)
    }
  }

  return (
    <>
    {result ? <div>Vierification Link has been sent to your email. If not found check your spam folder</div>:
    <div className="flex bg-slate-500">Signup
      <form onSubmit={signupHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={(e)=>{
          setName(e.target.value);
        }}/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=>{
          setEmail(e.target.value);
        }}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e)=>{
          setConfirmPassword(e.target.value);
        }}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  }
</>
  )
}

export default Signup