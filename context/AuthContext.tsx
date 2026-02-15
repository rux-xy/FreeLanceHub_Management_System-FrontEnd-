import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, LoginResponse } from "../types/auth";

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (data: LoginResponse) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (data: LoginResponse) => {
        setToken(data.token);
        //setUser(data.user);

        localStorage.setItem("token", data.token);
       // localStorage.setItem("user", JSON.stringify(data.user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("token");
        //localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
