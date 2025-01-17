import './App.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard'
import AdminSignin from './pages/AdminSignin';
import AdminDashboard from './pages/AdminDashboard';
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} /> 
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path ="dashboard" element={<Dashboard/>}/>
      <Route path ="admin">
        <Route path='signin' element={<AdminSignin/>}/>
        <Route path='dashboard' element={<AdminDashboard/>}/>
      </Route>
      {/* error page */}
      <Route path="*" element={<ErrorPage/>} />
    </Route>
  )
);
function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
