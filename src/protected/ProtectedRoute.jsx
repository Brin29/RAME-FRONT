import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({redirectTo="/login"}) => {
  const token = localStorage.getItem("token");

  if (!token){
    return <Navigate to={redirectTo}/>
  }
  return <Outlet/>
}
