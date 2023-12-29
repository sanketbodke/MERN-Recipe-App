import {Outlet, Navigate} from "react-router-dom";

function PrivateRoute() {
    const currentUser = false
    return (
        currentUser ? <Outlet/> : <Navigate to="auth/login"/>
    );
}

export default PrivateRoute;