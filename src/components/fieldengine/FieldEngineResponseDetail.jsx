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
    {(() => {
        const responsible = response.context?.responsible;

        if (!responsible) return "-";

        if (typeof responsible === "string") {
            return responsible;
        }

        if (typeof responsible === "object") {
            return (
                responsible.nombre ||
                responsible.name ||
                responsible.codigo ||
                responsible.label ||
                responsible.value ||
                "-"
            );
        }

        return "-";
    })()}
</span>

                    </div>

                    <div>

                        <label>Ubicación</label>

                        <span>
    {typeof response.context?.location === "object"
        ? response.context?.location?.nombre ||
          response.context?.location?.name ||
          JSON.stringify(response.context?.location)
        : response.context?.location || "-"}
</span>

                    </div>

                    <div>

                        <label>Activo principal</label>

                        <span>
    {typeof response.context?.primaryAsset === "object"
        ? response.context?.primaryAsset?.nombre ||
          response.context?.primaryAsset?.name ||
          response.context?.primaryAsset?.codigo ||
          JSON.stringify(response.context?.primaryAsset)
        : response.context?.primaryAsset || "-"}
</span>

                    </div>

                    <div>

                        <label>Activo secundario</label>

<span>
    {typeof response.context?.secondaryAsset === "object"
        ? response.context.secondaryAsset?.nombre ||
          response.context.secondaryAsset?.name ||
          response.context.secondaryAsset?.codigo ||
          response.context.secondaryAsset?.label ||
          response.context.secondaryAsset?.value ||
          "-"
        : response.context?.secondaryAsset || "-"}
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