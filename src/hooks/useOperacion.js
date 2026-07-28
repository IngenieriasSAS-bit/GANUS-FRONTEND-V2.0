import { useCallback, useEffect, useState } from "react";

import {
    obtenerDashboardOperacion,
} from "../services/operacionService";

export default function useOperacion() {

    const [dashboard, setDashboard] = useState(() =>
        obtenerDashboardOperacion()
    );

    const actualizarDashboard = useCallback(() => {

        setDashboard(
            obtenerDashboardOperacion()
        );

    }, []);

    useEffect(() => {

        window.addEventListener(
            "make-updated",
            actualizarDashboard
        );

        return () => {

            window.removeEventListener(
                "make-updated",
                actualizarDashboard
            );

        };

    }, [actualizarDashboard]);

    return {

        dashboard,

        actualizarDashboard,

    };

}