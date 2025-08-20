import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signUp = async (username, password) => {
    try {
      const result = await fetch (`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      });
      const data = await result.json();
      if (data.success) {
        setToken(data.token);
        setLocation("TABLET")
        return { success: true, message: data.message}
      }
    } catch (error) {
      console.error(error)
    }
  }
  // TODO: authenticate
  const authenticate = async () => {
    try {
      if (!token) {
      return { success: false, message: "No token available" };
    }
      const result = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      const data = await result.json()
      if (data.success === true) {
        setLocation("TUNNEL");
      return { 
        success: true, 
      };
    } else {
      return { 
        success: false, 
      };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
  };
  
  const value = { location, token, signUp, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}