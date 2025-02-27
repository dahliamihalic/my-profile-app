import { useState, useEffect } from "react";
import { useContext } from "react";
import style from "../styles/profileform.module.css";
import { useNavigate } from "react-router-dom";
import { ModeContext, ModeProvider } from "../contexts/ModeContext";
import AuthContext from "../contexts/AuthContext";

const AuthForm = ({ isRegister = false }) => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { mode } = useContext(ModeContext);
    const [data, setData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("username", data.username.trim());
        formData.append("password", data.password.trim());
        if (isRegister) formData.append("email", data.email.trim());
        formData.append("action", isRegister ? "register" : "login");
        try {
            const response = await fetch(`https://web.ics.purdue.edu/~omihalic/profile-app/auth.php`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setErrors('');
                setSuccessMessage(data.message);
                setData({
                    username: "",
                    password: "",
                    email: "",
                });
                navigate("/");
            } else {
                setSuccessMessage('');
                setErrors(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            setSubmitting(false);
        }
    };

    return (
        <ModeProvider>
            <form onSubmit={handleSubmit} className={style["profile-form"]}>
                <h1>{isRegister ? "Register" : "Login"}</h1>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required value={data.username} onChange={handleChange} />
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
