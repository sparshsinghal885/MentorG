
import { Navigate } from "react-router"

const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.role === "admin") {
    return children
  }
  else {
    return <Navigate to={'/auth/login'} />
  }
}

export default ProtectedRouteForAdmin;