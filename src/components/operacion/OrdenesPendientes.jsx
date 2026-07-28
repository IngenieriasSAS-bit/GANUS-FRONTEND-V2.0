export default function OrdenesPendientes({ cantidad }) {

    return (

        <section className="operacion-section">

            <h2>
                Órdenes Pendientes
            </h2>

            <div className="operacion-highlight">

                <span className="operacion-highlight-number">
                    {cantidad}
                </span>

                <div>

                    <h4>
                        Órdenes por ejecutar
                    </h4>

                    <p>
                        Corresponden a órdenes de trabajo creadas desde MAKE y pendientes de ejecución por los operadores.
                    </p>

                </div>

            </div>

        </section>

    );

}