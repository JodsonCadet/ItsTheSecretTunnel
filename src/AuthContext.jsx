import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) 
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (username, password) => {
    try {
      const result = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await result.json();
      console.log("Signup response:", data);

      if (data.success) {
        setToken(data.token);
        setLocation("TABLET");
        return { success: false, message: data.message };
      } else {
        console.error("Signup failed:", data.message);
        return { success: false, message: data.message };
      }

    } catch (error) {
      console.error("Error posting data:", error);
      return { success: false, message: "Network or server error." };
    }
  };

  // TODO: authenticate
  const authenticate = async () => {
  try {
    const response = await fetch(`${API}/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json(); 

    if (data.success === true) {
      setLocation("TUNNEL");
      return { success: true };
    } else {
      return { success: false };
  } catch (error) {
    console.error("auth error:", error);
    return { success: false, message: "server error." }
  };
  }
  const value = { location, token, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
