const indicadores = [

    {
        modulo: "Inventario",
        disponibilidad: "99 %",
        rendimiento: "97 %",
        estado: "Excelente",
    },

    {
        modulo: "Pesaje",
        disponibilidad: "98 %",
        rendimiento: "95 %",
        estado: "Excelente",
    },

    {
        modulo: "Actividades",
        disponibilidad: "97 %",
        rendimiento: "93 %",
        estado: "Bueno",
    },

    {
        modulo: "Alertas",
        disponibilidad: "95 %",
        rendimiento: "89 %",
        estado: "Atención",
    },

    {
        modulo: "Organización",
        disponibilidad: "100 %",
        rendimiento: "99 %",
        estado: "Excelente",
    },

];

export default function TablaIndicadores() {

    return (

        <section className="indicadores-panel">

            <header className="panel-header">

                <h3>

                    Indicadores por módulo

                </h3>

            </header>

            <table className="tabla-indicadores">

                <thead>

                    <tr>

                        <th>Módulo</th>

                        <th>Disponibilidad</th>

                        <th>Rendimiento</th>

                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        indicadores.map((item) => (

                            <tr
                                key={item.modulo}
                            >

                                <td>{item.modulo}</td>

                                <td>{item.disponibilidad}</td>

                                <td>{item.rendimiento}</td>

                                <td>{item.estado}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}