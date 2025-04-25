import { useState } from "react";
import MainLayout from "./MainLayout";
import { registerUser, loginUser } from "../services/api";
import "../styles/login.css";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    };

    const toggleView = () => {
        setIsRegister(!isRegister);
        setErrorMessage("");
    };

    const handleLogin = async () => {
        try {
            const hashedPassword = await hashPassword(password);

            login({
                username: username,
                password: hashedPassword
            }).then(() => {
                alert("Usuario logueado con éxito");
            }).catch((error) => {
                console.error("Error al iniciar sesión:", error);
                setErrorMessage("Credenciales incorrectas");
            });
        } catch (error) {
            setErrorMessage("Error de conexión");
        }
    };

    const login = async (user) => {
        try {
            const response = await loginUser(user);

            if (response["status"] === 201) {
                console.log("Ingreso exitoso:", user);
                setUser(response["user"]);
                setIsAuthenticated(true);
            } else {
                console.error("Error al ingresar el usuario:", response.statusText);
                setErrorMessage("Credenciales incorrectas");
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error al ingresar el usuario:", error);
        }
    }

    const handleRegister = async () => {
        try {
            const hashedPassword = await hashPassword(password);

            register({
                username: username,
                password: hashedPassword,
                email: email,
                name: name,
                profilePicture: profilePicture
            }).then(() => {
                alert("Usuario registrado con éxito");
                window.location.reload();
            }).catch((error) => {
                console.error("Error al registrar el usuario:", error);
                setErrorMessage("Error al registrar el usuario");
            });
        } catch (error) {
            setErrorMessage("Error de conexión");
        }
    }

    const register = async (user) => {
        try {
            const response = await registerUser(user);
            if (response.status === 201) {
                console.log("Usuario creada:", user);
            } else {
                console.error("Error al crear el usuario:", response.statusText);
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    }


    if (isAuthenticated) return <MainLayout user={user} />;

    return (
        <div className="container">
            <div className="login-box">
                <h1>{isRegister ? "Sign Up" : "Login"}</h1>

                {!isRegister && (
                    <>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </>
                )}
                {isRegister && (
                    <>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Profile Picture URL" onChange={(e) => setProfilePicture(e.target.value)} />
                    </>
                )}

                <button onClick={isRegister ? handleRegister : handleLogin}>{isRegister ? "Sign Up" : "Login"}</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="toggle-button" onClick={toggleView}>
                    {isRegister ? "¿Ya tienes una cuenta? Log In" : "¿Aún no tienes una cuenta? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default Login;