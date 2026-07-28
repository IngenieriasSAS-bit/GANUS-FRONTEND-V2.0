/* ==========================================================
   FORMATTERS
========================================================== */

export const formatPriority = (priority) => {

    const PRIORITIES = {

        low: "Baja",

        medium: "Media",

        high: "Alta",

        critical: "Crítica",

    };

    return PRIORITIES[priority] || priority || "-";

};

export const formatStatus = (status) => {

    const STATUS = {

        pending: "Pendiente",

        assigned: "Asignada",

        scheduled: "Programada",

        in_progress: "En ejecución",

        paused: "Pausada",

        completed: "Finalizada",

        cancelled: "Cancelada",

    };

    return STATUS[status] || status || "-";

};

export const formatDate = (date) => {

    if (!date) {

        return "-";

    }

    return new Intl.DateTimeFormat(

        "es-CO",

        {

            day: "2-digit",

            month: "2-digit",

            year: "numeric",

        }

    ).format(new Date(date));

};

export const formatDateTime = (date) => {

    if (!date) {

        return "-";

    }

    return new Intl.DateTimeFormat(

        "es-CO",

        {

            day: "2-digit",

            month: "2-digit",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

        }

    ).format(new Date(date));

};

export const formatConsumerModule = (value) => {

    const MODULES = {

        inventory: "Inventario",

        operation: "Operación",

        make: "Actividades",

        track: "Seguimiento",

        advisory: "Asesoría",

        knowledge: "Knowledge",

    };

    return MODULES[value] || value || "-";

};

export const formatContextValue = (value) => {

    const VALUES = {

        "activity-inspection":
            "Inspección de actividades",

        inventory:
            "Inventario",

        vaccination:
            "Vacunación",

        weighing:
            "Pesaje",

    };

    return VALUES[value] || value || "-";

};