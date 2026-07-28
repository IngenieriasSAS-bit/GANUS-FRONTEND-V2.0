import { useCallback, useState } from "react";

import {
    getFilteredWorkOrders,
    getWorkOrdersSummary,
} from "../services/makeService";

export default function useWorkOrders(initialFilters = {}) {

    const [filters, setFilters] = useState(initialFilters);

    const refresh = useCallback(() => {
        // Vacío por ahora.
        // Lo implementaremos cuando migremos el servicio.
    }, []);

    return {
        filters,
        setFilters,
        orders: getFilteredWorkOrders(filters),
        summary: getWorkOrdersSummary(),
        refresh,
    };
}