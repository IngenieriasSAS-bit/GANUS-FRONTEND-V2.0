import { getFieldEngineTemplates } from "./fieldEngineService";
import { getFieldEngineResponses } from "./fieldEngineResponseService";

/* ==========================================================
   FIELD ENGINE DASHBOARD SERVICE
========================================================== */

export const getFieldEngineDashboard = () => {

    const templates = getFieldEngineTemplates();

    const responses = getFieldEngineResponses();

    const publishedTemplates = templates.filter(
        template => template.state === "published"
    );

    const draftTemplates = templates.filter(
        template => template.state === "draft"
    );


    return {

    totalTemplates: templates.length,

    totalResponses: responses.length,

    publishedTemplates: publishedTemplates.length,

    draftTemplates: draftTemplates.length,

    modules: {

        inventory: {

            templates: templates.filter(
                template => template.consumerModule === "inventory"
            ).length,

            responses: responses.filter(
                response => response.consumerModule === "inventory"
            ).length

        },

        activities: {

            templates: templates.filter(
                template => template.consumerModule === "make"
            ).length,

            responses: responses.filter(
                response => response.consumerModule === "make"
            ).length

        },

        operation: {

    templates: publishedTemplates.length,

    responses: responses.length

},

        events: {

            templates: templates.filter(
                template => template.consumerModule === "track"
            ).length,

            responses: responses.filter(
                response => response.consumerModule === "track"
            ).length

        },

        advisory: {

            templates: templates.filter(
                template => template.consumerModule === "advisory"
            ).length,

            responses: responses.filter(
                response => response.consumerModule === "advisory"
            ).length

        },

    },

    templates,

responses,

recentTemplates: [...templates]
    .sort(
        (a, b) =>
            new Date(b.updatedAt) -
            new Date(a.updatedAt)
    )
    .slice(0, 5),

recentResponses: [...responses]
    .sort(
        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
    )
    .slice(0, 5),

recentActivity: [

    ...templates.map(template => ({

        id: template.id,

        type: "template",

        title: template.name,

        description:
            template.state === "published"
                ? "Plantilla publicada"
                : "Plantilla creada",

        date:
            template.updatedAt ||
            template.createdAt,

    })),

    ...responses.map(response => ({

        id: response.id,

        type: "response",

        title:
            response.context?.recordCode ||
            response.templateName,

        description:
            "Nueva captura registrada",

        date:
            response.createdAt,

    }))

]
.sort(
    (a, b) =>
        new Date(b.date) -
        new Date(a.date)
)
.slice(0, 6)

};

};

