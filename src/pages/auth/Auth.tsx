import { Outlet } from "react-router-dom"
import './Auth.css'

const Auth = () => {
  return (
    <div className="auth-container h-[100vh] flex justify-center items-center">
      <Outlet />
    </div>
  )
}

export default Auth