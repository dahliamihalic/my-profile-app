import { createContext, useState,useContext } from "react";
import { ModeContext, ModeProvider } from "./ModeContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", "true");
  }
  const logout = () => {
    fetch ("https://web.ics.purdue.edu/~omihalic/profile-app/logout.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        setIsLogin(false);
        localStorage.setItem("isLogin", "false");
      }else{
        console.log(data.message);
      }    
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;