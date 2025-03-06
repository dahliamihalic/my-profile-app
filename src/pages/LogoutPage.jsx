import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const LogoutPage = () => {
    const { logout } = useContext(AuthContext);
    logout;
    
    return (
        <div>
            <h1>Logout</h1>
            <p>Logging out...</p>
        </div>
    );
    };

export default LogoutPage;