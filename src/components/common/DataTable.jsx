/**
 * --------------------------------------------------------
 * Componente: DataTable
 * Descripción:
 * Tabla reutilizable para todos los módulos de GANUS.
 * --------------------------------------------------------
 */

import "./DataTable.css";

export default function DataTable({

    columns,

    rows

}) {

    return (

        <table className="data-table">

            <thead>

                <tr>

                    {

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

                    rows.length > 0

                        ?

                        rows.map((row, index) => (

                            <tr key={index}>

                                {

                                    Object.values(row).map((value, i) => (

                                        <td key={i}>

                                            {value}

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                        :

                        <tr>

                            <td

                                colSpan={columns.length}

                                className="empty"

                            >

                                No existen registros.

                            </td>

                        </tr>

                }

            </tbody>

        </table>

    );

}