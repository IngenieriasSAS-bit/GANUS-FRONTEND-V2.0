/**
 * --------------------------------------------------------
 * Componente: DataTable
 * Tabla reutilizable para todos los módulos de GANUS.
 * Compatible con:
 *
 * columns = ["Nombre", "Estado"]
 *
 * o
 *
 * columns = [
 *   { key:"name", title:"Nombre" },
 *   { key:"estado", title:"Estado" },
 *   { key:"acciones", title:"Acciones", render:(row)=> ... }
 * ]
 * --------------------------------------------------------
 */

import "./DataTable.css";

export default function DataTable({

    columns = [],

    rows = [],

}) {

    const advancedMode =
        columns.length > 0 &&
        typeof columns[0] === "object";

    return (

        <table className="data-table">

            <thead>

                <tr>

                    {

                        advancedMode

                            ?

                            columns.map((column) => (

                                <th key={column.key}>

                                    {column.title}

                                </th>

                            ))

                            :

                            columns.map((column) => (

                                <th key={column}>

                                    {column}

                                </th>

                            ))

                    }

                </tr>

            </thead>

            <tbody>

                {

                    rows.length === 0

                        ?

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="empty"
                            >

                                No existen registros.

                            </td>

                        </tr>

                        :

                        rows.map((row, index) => (

                            <tr key={row.id ?? index}>

                                {

                                    advancedMode

                                        ?

                                        columns.map((column) => (

                                            <td key={column.key}>

                                                {

    column.render

        ?

        column.render(row)

        :

        column.key === "active"

            ? (

                <span
                    className={
                        row.active

                            ? "estado estado-activo"

                            : "estado estado-inactivo"
                    }
                >

                    {

                        row.active

                            ? "Activo"

                            : "Inactivo"

                    }

                </span>

            )

            :

            row[column.key]

}

                                            </td>

                                        ))

                                        :

                                        Object.values(row).map((value, i) => (

                                            <td key={i}>

                                                {value}

                                            </td>

                                        ))

                                }

                            </tr>

                        ))

                }

            </tbody>

        </table>

    );

}