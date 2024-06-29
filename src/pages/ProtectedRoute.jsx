import { Navigate, Outlet } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext"

const ProtectedRoute = () => {

    const { store } = useGlobalContext(); 
    const { fileSystemName } = store;

  return (
    fileSystemName === "" ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    )
  )
}

export default ProtectedRoute