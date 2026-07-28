/**
 * ---------------------------------------------------------
 * Servicio: authService
 * Módulo: Seguridad
 *
 * Responsabilidad:
 * Gestionar únicamente la autenticación.
 * No administra sesiones.
 * ---------------------------------------------------------
 */

import { obtenerUsuarios } from "./organizationService";

import {

    registrarEvento,

} from "./auditService";

/**
 * ---------------------------------------------------------
 * Iniciar sesión
 * ---------------------------------------------------------
 */
export function iniciarSesion(usuario, password) {

    // ==========================================
    // Administrador Demo
    // ==========================================

    if (

        usuario === "admin"

        &&

        password === "123456"

    ) {

        registrarEvento({

            usuario: "Administrador General",

            rol: "Administrador",

            modulo: "Seguridad",

            accion: "Inicio de sesión",

            descripcion: "El administrador inició sesión correctamente.",

            resultado: "Éxito",

        });

        return {

            id: 0,

            usuario: "admin",

            nombre: "Administrador General",

            rol: 1,

        };

    }

    // ==========================================
    // Usuarios registrados
    // ==========================================

    const usuarios = obtenerUsuarios();

    const encontrado = usuarios.find(

        (item) =>

            item.nombre === usuario

    );

    if (!encontrado) {

        return null;

    }

    const usuarioDemo = JSON.parse(

        localStorage.getItem("usuarioDemo")

    );

    if (

        usuarioDemo?.usuario !== usuario ||

        usuarioDemo?.password !== password

    ) {

        return null;

    }

    registrarEvento({

        usuario: encontrado.nombre,

        rol: encontrado.rol,

        modulo: "Seguridad",

        accion: "Inicio de sesión",

        descripcion: "Usuario autenticado correctamente.",

        resultado: "Éxito",

    });

    return {

        id: encontrado.id,

        usuario,

        nombre: encontrado.nombre,

        rol: encontrado.rol,

    };

}