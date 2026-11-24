
import { createContext, useContext, useState } from "react";
import { apiRequest } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("budgetbite_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    const saveSession = (data) => {
        localStorage.setItem("budgetbite_user", JSON.stringify(data.user));
        localStorage.setItem("budgetbite_access_token", data.accessToken);
        localStorage.setItem("budgetbite_refresh_token", data.refreshToken);
        setUser(data.user);
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const data = await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
            });
            saveSession(data);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            saveSession(data);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("budgetbite_user");
        localStorage.removeItem("budgetbite_access_token");
        localStorage.removeItem("budgetbite_refresh_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
