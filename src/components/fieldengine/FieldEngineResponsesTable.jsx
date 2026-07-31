import { Eye } from "lucide-react";

import DataGrid from "../common/DataGrid";

export default function FieldEngineResponsesTable({
    responses,
    onView,
}) {

    const columns = [

        {
            key: "codigo",
            label: "Código",
            render: (row) => (

                <div className="fe-grid-code">

                    <strong>{row.codigo}</strong>

                    <span>
                        Registro generado
                    </span>

                </div>

            ),
        },

        {
            key: "plantilla",
            label: "Plantilla",
            render: (row) => (

                <div className="fe-grid-template">

                    <strong>{row.plantilla}</strong>

                    <span>
                        Plantilla publicada
                    </span>

                </div>

            ),
        },

        {
            key: "responsable",
            label: "Responsable",
            render: (row) => {

    const responsableNombre =
        typeof row.responsable === "string"
            ? row.responsable
            : row.responsable?.nombre ||
              row.responsable?.name ||
              "Sin responsable";

    const initials = responsableNombre
        .split(" ")
        .map((x) => x[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (

        <div className="fe-grid-user">

            <div className="fe-grid-avatar">

                {initials || "--"}

            </div>

            <span>

                {responsableNombre}

            </span>

        </div>

    );

},
        },

        {
            key: "fecha",
            label: "Fecha",
        },

        {
            key: "estado",
            label: "Estado",
            render: (row) => (

                <span
                    className={`fe-status-badge fe-status-badge--${row.estado}`}
                >

                    {row.estado === "completed"
                        ? "Completado"
                        : row.estado}

                </span>

            ),
        },

        {
            key: "acciones",
            label: "Acciones",
            render: (row) => (
                <button
    type="button"
    className="fe-grid-action"
    onClick={() => onView(row.response)}
>

    <Eye size={17} />

    Ver

</button>

            ),
        },

    ];

    const rows = responses.map((response) => ({

        id: response.id,

        codigo:
            response.context?.recordCode ||
            "SIN-CÓDIGO",

        plantilla:
            response.templateName,

        responsable:
        typeof response.context?.responsible === "string"
            ? response.context.responsible
            : response.context?.responsible?.nombre ||
              response.context?.responsible?.name ||
              "Sin responsable",

        fecha:
            new Date(
                response.createdAt
            ).toLocaleDateString("es-CO"),

        estado:
            response.status,
           
        response,    

    }));

    return (

        <DataGrid
            title="Respuestas registradas"
            subtitle="Consulta todas las respuestas generadas desde las plantillas publicadas."
            columns={columns}
            rows={rows}
        />

    );

}