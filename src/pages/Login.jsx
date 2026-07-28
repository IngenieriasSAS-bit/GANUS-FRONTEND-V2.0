import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/sessionManager";

import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");

    const [password, setPassword] = useState("");

    // ======================================================
    // Iniciar sesión
    // ======================================================

    const ingresar = () => {

        const autenticado = login(

            usuario,

            password

        );

        if (!autenticado) {

            alert(

                "Usuario o contraseña incorrectos."

            );

            return;

        }

        navigate("/");

    };

    return (

        <div className="loginContainer">

            <div className="loginOverlay">

                <div className="loginCard">

                    <h1 className="logoLogin">

                        GANUS

                    </h1>

                    <p className="subtituloLogin">

                        Gestión Inteligente Ganadera

                    </p>

                    <form

                        onSubmit={(e) => {

                            e.preventDefault();

                            ingresar();

                        }}

                    >

                        <input

                            type="text"

                            placeholder="Usuario"

                            value={usuario}

                            onChange={(e) =>

                                setUsuario(e.target.value)

                            }

                        />

                        <input

                            type="password"

                            placeholder="Contraseña"

                            value={password}

                            onChange={(e) =>

                                setPassword(e.target.value)

                            }

                        />

                        <button

                            className="btnLogin"

                            type="submit"

                        >

                            Ingresar

                        </button>

                    </form>

                    <p

                        className="olvidePassword"

                        onClick={() => {

                            alert(

                                "Por favor comuníquese con el administrador del sistema."

                            );

                        }}

                    >

                        ¿Olvidaste tu contraseña?

                    </p>

                    <p className="registroTexto">

                        ¿No tienes cuenta?

                        <span

                            className="btnRegistro"

                            onClick={() =>

                                navigate("/registro")

                            }

                        >

                            Registrarse

                        </span>

                    </p>

                    <p className="textoInferior">

                        Controla, registra y optimiza todos los procesos de tu ganado desde un solo lugar.

                    </p>

                </div>

            </div>

        </div>

    );

}