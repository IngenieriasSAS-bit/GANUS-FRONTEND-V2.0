import { getAdvisoryHistory } from "./advisoryHistoryService";

import {
    getWorkOrders,
} from "./makeService";

import {
    getFieldEngineTemplates,
} from "./fieldEngineService";

import {
    obtenerActividadesRecientes,
} from "./actividadesService/actividadesService";

const mapAdvisoryActivity = (item) => ({

    id: item.id,

    source: "advisory",

    title:

        item.type === "orientation"

            ? "Asesoría realizada"

            : "Borrador generado",

    description:

        item.templateName ||

        item.query ||

        "",

    date: item.createdAt,

    route: "/advisory",

});

const mapFieldEngineActivity = (template) => ({

    id: template.id,

    source: "field-engine",

    title:

        template.state === "published"

            ? "Plantilla publicada"

            : "Plantilla actualizada",

    description:

        template.name,

    date:

        template.updatedAt ||

        template.createdAt,

    route: "/field-engine",

});

const mapActivity = (activity) => ({

    id: activity.id,

    source: "activities",

    title: activity.tipoActividad,

    description:
        activity.observacion,

    date: activity.fecha,

    route: "/activities",

});

const mapWorkOrderHistory = (order) => {

    if (!order.history) {

        return [];

    }

    return order.history.map(event => ({

        id:

            `${order.id}-${event.id}`,

        source: "make",

        title:

            getOrderEventTitle(

                event.action

            ),

        description:

            order.routineName ||

            order.templateName ||

            order.code ||

            "",

        date: event.date,

        route: "/make",

    }));

};

const getOrderEventTitle = (action) => {

    switch (action) {

        case "created":

            return "Orden creada";

        case "started":

            return "Orden iniciada";

        case "saved":

            return "Avance guardado";

        case "completed":

            return "Orden finalizada";

        case "status-change":

            return "Estado actualizado";

        default:

            return "Evento de orden";

    }

};

export const getRecentActivity = () => {

    const advisory =

        getAdvisoryHistory()

            .map(mapAdvisoryActivity);

    const templates =

        getFieldEngineTemplates()

            .map(mapFieldEngineActivity);

    const activities =

        obtenerActividadesRecientes(20)

            .map(mapActivity);

    const workOrders =

        getWorkOrders()

            .flatMap(

                mapWorkOrderHistory

            );

    return [

        ...advisory,

        ...templates,

        ...activities,

        ...workOrders,

    ]

        .filter(

            item => item.date

        )

        .sort(

            (a, b) =>

                new Date(b.date)

                -

                new Date(a.date)

        )

        .slice(0, 20);

};