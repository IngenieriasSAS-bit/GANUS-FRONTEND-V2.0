import { getFieldEngineTemplates } from "../../services/fieldEngineService";

export default function FieldEngineResponseDetail({

    response,

}) {

    if (!response) return null;

    const templates = getFieldEngineTemplates();

    const template = templates.find(

        (item) => item.id === response.templateId

    );

    const fields =

        template?.sections?.flatMap(

            (section) => section.fields || []

        ) || [];

    const getLabel = (key) => {

        const field = fields.find(

            (item) =>

                item.key === key ||

                item.id === key ||

                item.name === key

        );

        return field?.label || key;

    };

    const getStatus = (status) => {

    switch (status) {

        case "completed":
            return {
                text: "Completado",
                className: "fe-status-badge fe-status-badge--completed",
            };

        case "pending":
            return {
                text: "Pendiente",
                className: "fe-status-badge fe-status-badge--pending",
            };

        case "draft":
            return {
                text: "Borrador",
                className: "fe-status-badge fe-status-badge--draft",
            };

        default:
            return {
                text: status || "-",
                className: "fe-status-badge",
            };

    }

};

const formatValue = (value) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "-";
    }

    if (typeof value === "boolean") {
        return value ? "Sí" : "No";
    }

    if (
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

        return new Date(value).toLocaleDateString("es-CO");

    }

    if (
        typeof value === "string" &&
        value.includes("T")
    ) {

        const date = new Date(value);

        if (!Number.isNaN(date.getTime())) {

            return date.toLocaleString("es-CO");

        }

    }

    return String(value);

};

    return (

        <div className="fe-response-detail">

            <section className="fe-response-section">

                <h3>

                    Información general

                </h3>

                <div className="fe-response-grid">

                    <div>

                        <label>Código</label>

                        <span>

                            {response.context?.recordCode || "-"}

                        </span>

                    </div>

                    <div>

                        <label>Plantilla</label>

                        <span>

                            {response.templateName}

                        </span>

                    </div>

                    <div>

                        <label>Versión</label>

                        <span>

                            {response.templateVersion}

                        </span>

                    </div>

                    <div>

                        <label>Estado</label>

<span
    className={
        getStatus(response.status).className
    }
>

    {getStatus(response.status).text}

</span>

                    </div>

                    <div>

                        <label>Responsable</label>

                        <span>

                            {response.context?.responsible || "-"}

                        </span>

                    </div>

                    <div>

                        <label>Ubicación</label>

                        <span>

                            {response.context?.location || "-"}

                        </span>

                    </div>

                    <div>

                        <label>Activo principal</label>

                        <span>

                            {response.context?.primaryAsset || "-"}

                        </span>

                    </div>

                    <div>

                        <label>Activo secundario</label>

                        <span>

                            {response.context?.secondaryAsset || "-"}

                        </span>

                    </div>

                </div>

            </section>

            <section className="fe-response-section">

                <h3>

                    Respuestas del formulario

                </h3>

                <div className="fe-response-grid">

                    {

                        Object.entries(response.values || {}).map(

                            ([key,value])=>(

                                <div key={key}>

                                    <label>

                                        {getLabel(key)}

                                    </label>

                                    <span>

    {formatValue(value)}

</span>

                                </div>

                            )

                        )

                    }

                </div>

            </section>

        </div>

    );

}