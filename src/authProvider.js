import React, { useState, createContext, useContext } from "react";
import api, { auth_endpoints } from "./api/index";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { data } = await api.post(`${auth_endpoints.login}`, { email, password })
      setUser(data.user);
      
      const token = data.user.token;

      if (token) {
        localStorage.setItem("token", token);
      }
      
      return { success: true, message: "Logado com sucesso." };
    } catch (error) {
      console.error("Erro interno ao logar", error);
      const errorMessage = error.response ? error.response.data.message : "Erro ao logar, tente novamente mais tarde.";
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};