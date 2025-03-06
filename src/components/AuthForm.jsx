import { useState, useEffect, useContext, useRef } from "react";
import style from "../styles/profileform.module.css";
import { useNavigate } from "react-router-dom";
import { ModeProvider, useMode } from "../contexts/ModeContext";
import AuthContext from "../contexts/AuthContext";
import useAuthform from "../hooks/authFormHook";

const AuthForm = ({ isRegister = false }) => {
    const { login } = useContext(AuthContext);
    const { mode, toggleMode } = useMode();
    const { data, errors, submitting, successMessage, handleChange, handleSubmit} = useAuthform(isRegister);
    const nameRef = useRef(null);
    useEffect(() => {
        nameRef.current.focus();
    }, []);
    
    return (
        <ModeProvider>
            <form onSubmit={handleSubmit} className={style["profile-form"]}>
                <h1>{isRegister ? "Register" : "Login"}</h1>
                <label htmlFor="username">Username</label>
                <input ref={nameRef} type="text" id="username" name="username" required value={data.username} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required minLength={8} value={data.password} onChange={handleChange} />
                {isRegister && <><label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={data.email} onChange={handleChange} /></>}
                <button
                    type="submit"
                    disabled={
                        submitting ||
                        data.username.trim() === "" ||
                        data.password.trim() === "" ||
                        (isRegister && data.email.trim() === "")
                    }>
                    {submitting ? "Submitting..." : isRegister ? "Register" : "Login"}
                </button>
                {errors && <p className={style['error']}>{errors}</p>}
                {successMessage && <p className={style['success']}>{successMessage}</p>}
            </form>
        </ModeProvider>
    );

};

export default AuthForm;
