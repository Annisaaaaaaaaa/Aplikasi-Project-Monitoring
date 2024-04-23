// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom"; 
import { BASE_API } from "../utils/constant";
import swal from 'sweetalert2';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    
    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens")).user
            : null
    );

    

    const [userGroups, setUserGroups] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens")).groups
            : []
    );

    const [loading, setLoading] = useState(true);

    const history = useHistory(); 
    
    const loginUser = async (email, password, history) => {
        try {
            const response = await fetch(`${BASE_API}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Logged In");
    
                if (data && data.access) {
                    const decodedToken = jwt_decode(data.access);
                    console.log("Decoded token:", decodedToken);
                
                    if (decodedToken && decodedToken.groups && decodedToken.groups.length > 0) {
                        const userGroups = decodedToken.groups;
                        setUser(decodedToken.user);
                        setUserGroups(userGroups);
                        setAuthTokens(data);
                        localStorage.setItem("authTokens", JSON.stringify(data));
                
                        // Identifikasi Groups
                        const firstGroup = userGroups[0];
                        switch (firstGroup) {
                            case 1:
                                history.push('/pm/dashboard');
                                break;
                            case 2:
                                history.push('/sales/dashboard');
                                break;
                            case 3:
                                history.push('/administrator/dashboard');
                                break;
                            case 4:
                                history.push('/admin/dashboard');
                                break;
                            case 5:
                                history.push('/engineer/dashboard');
                                break;
                            default:
                                history.push('/login');
                                break;
                        }
                
                        swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            toast: true,
                            timer: 6000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                    } else {
                        console.error("User groups not found in token");
                        history.push("/default-dashboard");
                    }
                } else {
                    console.error("Token not received in response");
                    throw new Error("Failed to receive authentication token");
                }
            } else {
                console.error("Failed to login. Please check your credentials.");
                throw new Error("Failed to login. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            swal.fire({
                title: "Login Failed",
                text: error.message || "An error occurred while logging in",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
            throw error;
        }
    };
    
    const logoutUser = async (history) => {
        setAuthTokens(null);
        setUser(null);
        setUserGroups([]);
        localStorage.removeItem("authTokens");
        history.push("/login");
        swal.fire({
            title: "You have been logged out",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        userGroups,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
            setUserGroups(jwt_decode(authTokens.access).groups);
        }
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
