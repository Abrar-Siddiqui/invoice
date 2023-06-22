import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
    
    // const { token } = useAuth();
    const token=localStorage.getItem('authUser')

    if(!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}