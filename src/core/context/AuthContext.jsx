/**
 * ==========================================================
 * Contexto: AuthContext
 * Módulo: Seguridad
 *
 * Responsabilidad:
 * Centralizar la sesión del usuario.
 * ==========================================================
 */

import {
    useState,
} from "react";

import { AuthContext } from "./AuthContext.js";

import {
    logout,
    obtenerUsuarioSesion,
} from "../../services/sessionManager";

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() =>
        obtenerUsuarioSesion()
    );

    const cerrarSesion = () => {

        logout();

        setUsuario(null);

    };

    const actualizarSesion = () => {

        setUsuario(
            obtenerUsuarioSesion()
        );

    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                cerrarSesion,
                actualizarSesion,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}