import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModeContext, ModeProvider } from "../contexts/ModeContext";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { mode, toggleMode } = useContext(ModeContext);
  const { isLogin, logout } = useContext(AuthContext);

  return (
    <ModeProvider>
      <nav className={`${styles["navbar"]}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/add-profile">Add Profile</Link>
          </li>
        </ul>
        {isLogin ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/register">Register</Link>
          </>,
          <>
            <Link to="/logout">Logout</Link> 
          </>
        )}
        <button onClick={toggleMode}>
          {mode === "light" ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </ModeProvider>
  );
};

export default Navbar;