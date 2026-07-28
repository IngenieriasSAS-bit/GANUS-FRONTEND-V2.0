import { ClipboardCheck } from "lucide-react";

export default function ExecutionHeader() {

    return (

        <section className="ganus-module-header">

            <div className="ganus-module-header__icon">

                <ClipboardCheck size={26} />

            </div>

            <div>

                <span className="ganus-module-tag">

                    OPERATIVO

                </span>

                <h1>

                    Centro de ejecución de órdenes

                </h1>

                <p>

                    Ejecuta las órdenes generadas por MAKE, registra la información de campo y sincroniza el avance operativo con el resto de módulos de GANUS.

                </p>

            </div>

        </section>

    );

}