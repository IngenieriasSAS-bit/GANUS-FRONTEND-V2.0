/**
 * ---------------------------------------------------------
 * Servicio: auditService
 * Subsistema: Auditoría
 *
 * Responsabilidad:
 * Centralizar el registro de eventos
 * funcionales del sistema.
 * ---------------------------------------------------------
 */

const STORAGE_KEY = "ganus_auditoria";

/**
 * ---------------------------------------------------------
 * Obtener eventos
 * ---------------------------------------------------------
 */
export function obtenerEventos() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    ) || [];

}

/**
 * ---------------------------------------------------------
 * Registrar evento genérico
 * ---------------------------------------------------------
 */
export function registrarEvento(evento) {

    const eventos = obtenerEventos();

    eventos.unshift({

        id: crypto.randomUUID(),

        fecha: new Date().toISOString(),

        ...evento,

    });

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(eventos)

    );

}

/**
 * ---------------------------------------------------------
 * Login
 * ---------------------------------------------------------
 */
export function registrarLogin(

    usuario,

    rol

) {

    registrarEvento({

        usuario,

        rol,

        modulo: "Seguridad",

        accion: "Inicio de sesión",

        descripcion: "Usuario autenticado correctamente.",

        resultado: "Éxito",

    });

}

/**
 * ---------------------------------------------------------
 * Logout
 * ---------------------------------------------------------
 */
export function registrarLogout(

    usuario,

    rol

) {

    registrarEvento({

        usuario,

        rol,

        modulo: "Seguridad",

        accion: "Cerrar sesión",

        descripcion: "Usuario cerró sesión.",

        resultado: "Éxito",

    });

}

/**
 * ---------------------------------------------------------
 * Crear
 * ---------------------------------------------------------
 */
export function registrarCreacion(

    usuario,

    rol,

    modulo,

    descripcion

) {

    registrarEvento({

        usuario,

        rol,

        modulo,

        accion: "Crear",

        descripcion,

        resultado: "Éxito",

    });

}

/**
 * ---------------------------------------------------------
 * Editar
 * ---------------------------------------------------------
 */
export function registrarEdicion(

    usuario,

    rol,

    modulo,

    descripcion

) {

    registrarEvento({

        usuario,

        rol,

        modulo,

        accion: "Editar",

        descripcion,

        resultado: "Éxito",

    });

}

/**
 * ---------------------------------------------------------
 * Eliminar
 * ---------------------------------------------------------
 */
export function registrarEliminacion(

    usuario,

    rol,

    modulo,

    descripcion

) {

    registrarEvento({

        usuario,

        rol,

        modulo,

        accion: "Eliminar",

        descripcion,

        resultado: "Éxito",

    });

}

/**
 * ---------------------------------------------------------
 * Limpiar auditoría
 * ---------------------------------------------------------
 */
export function limpiarAuditoria() {

    localStorage.removeItem(

        STORAGE_KEY

    );

}