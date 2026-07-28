/**
 * ==========================================================
 * SaveManager
 * Subsistema de Persistencia
 *
 * Responsable de coordinar el estado
 * del guardado de toda la aplicación.
 * ==========================================================
 */

let estado = "saved";

const observadores = [];

export function obtenerEstado() {

    return estado;

}

export function establecerEstado(nuevoEstado) {

    estado = nuevoEstado;

    observadores.forEach(

        (callback) => callback(estado)

    );

}

export function suscribir(callback) {

    observadores.push(callback);

    return () => {

        const indice = observadores.indexOf(callback);

        if (indice >= 0) {

            observadores.splice(indice, 1);

        }

    };

}