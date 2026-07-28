import { useEffect, useState } from "react";

import { getFieldEngineDashboard } from "../services/fieldEngineDashboardService";

export default function useFieldEngineDashboard() {

    const [dashboard, setDashboard] = useState(
        getFieldEngineDashboard()
    );

    useEffect(() => {

        const actualizar = () => {

            setDashboard(
                getFieldEngineDashboard()
            );

        };

        actualizar();

        window.addEventListener(
            "field-engine-updated",
            actualizar
        );

        return () => {

            window.removeEventListener(
                "field-engine-updated",
                actualizar
            );

        };

    }, []);

    return dashboard;

}