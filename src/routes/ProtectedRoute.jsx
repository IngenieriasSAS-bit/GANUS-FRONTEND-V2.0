import { Navigate } from "react-router-dom";

import {

    obtenerUsuarioSesion,

} from "../services/sessionManager";

export default function ProtectedRoute({

    children,

}) {

    const usuario = obtenerUsuarioSesion();

    if (!usuario) {

        return <Navigate to="/login" replace />;

    }

    return children;

}