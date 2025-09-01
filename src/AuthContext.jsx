import { createContext, useEffect, useState,useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        loading: true,
        user: null
    });
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user/verify", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Token invalid or expired");

                const data = await res.json();
                setAuth({
                    isAuthenticated: true,
                    loading: false,
                    user: data.user
                });
            } catch (error) {
                console.error(error);
                setAuth(
                    {
                        isAuthenticated: false,
                        loading: true,
                        user: null
                    }
                );
            }
        }
        verifyAuth();
    }, [])
    const login = (user) => {
        setAuth({
            isAuthenticated: true,
            loading: false,
            user: user
        });
    }
    const logout = async () => {
        try {
        await fetch("http://localhost:8000/api/user/logout", {
            method: "GET",
            credentials: "include", 
        });
    } catch (error) {
        console.error("Logout failed:", error);
    }
        setAuth({
            isAuthenticated: false,
            loading: false,
            user: null
        });
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);