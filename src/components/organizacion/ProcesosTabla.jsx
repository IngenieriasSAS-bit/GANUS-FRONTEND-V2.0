export default function ProcesosTabla({

    procesos,

}) {

    if (procesos.length === 0) {

        return (

            <div className="sin-resultados">

                <h3>

                    No existen procesos empresariales.

                </h3>

                <p>

                    Cree el primer proceso para comenzar.

                </p>

            </div>

        );

    }

    return (

        <table className="tabla-organizacion">

            <thead>

                <tr>

                    <th>Código</th>

                    <th>Nombre</th>

                    <th>Descripción</th>

                    <th>Estado</th>

                </tr>

            </thead>

            <tbody>

                {

                    procesos.map((proceso) => (

                        <tr key={proceso.id}>

                            <td>

                                {proceso.code}

                            </td>

                            <td>

                                {proceso.name}

                            </td>

                            <td>

                                {proceso.description || "-"}

                            </td>

                            <td>

                                {

                                    proceso.active

                                        ? "Activo"

                                        : "Inactivo"

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}