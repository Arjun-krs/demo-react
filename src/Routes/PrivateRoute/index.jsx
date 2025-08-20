import { Navigate } from "react-router-dom";
import { useMemo } from "react";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useMemo(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        return !!(accessToken && refreshToken);
    }, [Navigate]);

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
