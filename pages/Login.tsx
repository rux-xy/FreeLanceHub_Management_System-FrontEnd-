import { useState, useContext } from "react";
import type { LoginRequest } from "../types/auth";
import { login as loginApi } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState<LoginRequest>({email: "", password: ""});
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginApi(form);
            login(response); // sets token in localStorage
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign In</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={styles.input}
                    />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div style={styles.divider}>OR</div>

                {/* Google Button */}
                <button style={styles.googleButton}>
    <span style={styles.googleContent}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="18px"
            height="18px"
        >
            <path fill="#FFC107" d="M43.6,20.5H42V20H24v8h11.3C33.6,32.6,29.2,36,24,36c-6.6,0-12-5.4-12-12
            s5.4-12,12-12c3,0,5.7,1.1,7.8,3l5.7-5.7C34.1,6.5,29.3,4,24,4C12.9,4,4,12.9,4,24
            s8.9,20,20,20s20-8.9,20-20C44,22.7,43.9,21.6,43.6,20.5z"/>
            <path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.7,16.1,19,12,24,12c3,0,5.7,1.1,7.8,3l5.7-5.7
            C34.1,6.5,29.3,4,24,4C16.3,4,9.6,8.4,6.3,14.7z"/>
            <path fill="#4CAF50" d="M24,44c5.1,0,9.7-1.9,13.2-5l-6.1-5.2C29,35.3,26.6,36,24,36
            c-5.2,0-9.6-3.4-11.2-8.1l-6.5,5C9.5,39.3,16.2,44,24,44z"/>
            <path fill="#1976D2" d="M43.6,20.5H42V20H24v8h11.3c-1.1,3.1-3.5,5.5-6.6,6.8l6.1,5.2
            C39.7,36.3,44,30.7,44,24C44,22.7,43.9,21.6,43.6,20.5z"/>
        </svg>
        Continue with Google
    </span>
                </button>


                {/* Register Link */}
                <p style={styles.registerText}>
                    New here?{" "}
                    <span
                        style={styles.registerLink}
                        onClick={() => navigate("/register")}
                    >
                    Create an account
                </span>
                </p>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    card: {
        width: "350px",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        fontWeight: 600,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    button: {
        padding: "12px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
        cursor: "pointer",
        marginTop: "10px",
    },
    divider: {
        margin: "20px 0",
            fontSize: "12px",
            color: "#888",
        },

    googleButton: {
        width: "100%",
        padding: "12px",
        backgroundColor: "white",
        border: "1px solid #dadce0",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },

    googleContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontWeight: 500,
        fontSize: "14px",
    },


    registerText: {
            marginTop: "20px",
            fontSize: "14px",
        },

        registerLink: {
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
        }
    };


    export default Login;
