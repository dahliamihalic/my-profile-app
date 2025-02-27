import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useContext(AuthContext);
    return isLogin ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
