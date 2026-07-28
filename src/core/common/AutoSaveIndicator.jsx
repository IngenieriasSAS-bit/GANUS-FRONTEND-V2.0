/**
 * ==========================================================
 * Componente: AutoSaveIndicator
 * Subsistema: Persistencia
 *
 * Responsabilidad:
 * Mostrar el estado global del guardado automático.
 * ==========================================================
 */

import {

    useEffect,

    useState,

} from "react";

import {

    obtenerEstado,

    suscribir,

} from "../../managers/SaveManager";

export default function AutoSaveIndicator() {

    const [estado, setEstado] = useState(

        obtenerEstado()

    );

    useEffect(() => {

        const cancelar = suscribir(

            setEstado

        );

        return cancelar;

    }, []);

    if (estado === "saving") {

        return (

            <div className="autosave-indicator saving">

                Guardando...

            </div>

        );

    }

    if (estado === "saved") {

        return (

            <div className="autosave-indicator saved">

                Cambios guardados

            </div>

        );

    }

    return (

        <div className="autosave-indicator pending">

            Cambios pendientes

        </div>

    );

}