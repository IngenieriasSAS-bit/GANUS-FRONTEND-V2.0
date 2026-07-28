export default function RutinasActivas({ cantidad }) {

    return (

        <section className="operacion-section">

            <h2>
                Rutinas Activas
            </h2>

            <div className="operacion-highlight">

                <span className="operacion-highlight-number">
                    {cantidad}
                </span>

                <div>

                    <h4>
                        Rutinas programadas
                    </h4>

                    <p>
                        Rutinas actualmente vigentes generadas desde el módulo MAKE para su ejecución operativa.
                    </p>

                </div>

            </div>

        </section>

    );

}