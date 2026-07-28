import "./DataGrid.css";

export default function DataGrid({
    title = "Registros",
    subtitle = "",
    columns = [],
    rows = [],
}) {

    return (

        <section className="ganus-grid">

            <div className="ganus-grid__header">

                <div>

                    <h3>{title}</h3>

                    {
                        subtitle && (
                            <p>{subtitle}</p>
                        )
                    }

                </div>

                <div className="ganus-grid__counter">

                    <span>{rows.length}</span>

                    <small>
                        {rows.length === 1 ? "Registro" : "Registros"}
                    </small>

                </div>

            </div>

            <div className="ganus-grid__body">

                <table>

                    <thead>

                        <tr>

                            {

                                columns.map((column) => (

                                    <th key={column.key}>

                                        {column.label}

                                    </th>

                                ))

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            rows.length > 0 ? (

                                rows.map((row) => (

                                    <tr key={row.id}>

                                        {

                                            columns.map((column) => (

                                                <td key={column.key}>

                                                    {

                                                        typeof column.render === "function"

                                                            ? column.render(row)

                                                            : row[column.key]

                                                    }

                                                </td>

                                            ))

                                        }

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        className="ganus-grid-empty"
                                        colSpan={columns.length}
                                    >

                                        <div className="ganus-grid-empty__content">

                                            <h4>
                                                No se encontraron registros
                                            </h4>

                                            <p>
                                                Las respuestas capturadas aparecerán aquí cuando existan formularios diligenciados.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </section>

    );

}