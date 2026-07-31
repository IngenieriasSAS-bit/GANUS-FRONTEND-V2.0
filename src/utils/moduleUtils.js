export const MODULES = {

    inventory: {

        name: "Inventario",

        color: "#76B82A",

        badgeClass: "module-inventory",

        route: "/inventario",

    },

    make: {

    name: "Operación",

    color: "#F59E0B",

    badgeClass: "module-operation",

    route: "/field-engine/responses",

},

    advisory: {

        name: "Advisory",

        color: "#2563EB",

        badgeClass: "module-advisory",

        route: "/advisory",

    },

    activities: {

        name: "Actividades",

        color: "#7C3AED",

        badgeClass: "module-activities",

        route: "/actividades",

    },

    "field-engine": {

        name: "Field Engine",

        color: "#475569",

        badgeClass: "module-field-engine",

        route: "/field-engine",

    },

    alerts: {

        name: "Alertas",

        color: "#DC2626",

        badgeClass: "module-alerts",

        route: "/alertas",

    }

};

export const getModuleInfo = (module) => {

    return (

        MODULES[module] ||

        {

            name: module || "General",

            color: "#64748B",

            badgeClass: "module-default",

            route: "/",

        }

    );

};