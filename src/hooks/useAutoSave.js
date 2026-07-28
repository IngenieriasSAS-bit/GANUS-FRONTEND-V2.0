/**
 * ---------------------------------------------------------
 * Hook: useAutoSave
 * Módulo: Productividad
 *
 * Responsabilidad:
 * Integrar AutoSave en cualquier formulario React.
 * ---------------------------------------------------------
 */

import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    iniciarAutoSave,

    detenerAutoSave,

} from "../services/autoSaveService";

export default function useAutoSave(

    modulo,

    datos,

    intervalo = 20000

) {

    const datosRef = useRef(datos);

    const [estado, setEstado] = useState("saved");

    // ==========================================
    // Actualizar referencia
    // ==========================================

    useEffect(() => {

    datosRef.current = datos;

}, [datos]);

    // ==========================================
    // AutoSave
    // ==========================================

    useEffect(() => {

        const timer = iniciarAutoSave(

            modulo,

            () => {

                setEstado("saving");

                return datosRef.current;

            },

            intervalo,

            () => {

                setEstado("saved");

            }

        );

        return () => {

            detenerAutoSave(timer);

        };

    }, [

        modulo,

        intervalo,

    ]);

    return estado;

}