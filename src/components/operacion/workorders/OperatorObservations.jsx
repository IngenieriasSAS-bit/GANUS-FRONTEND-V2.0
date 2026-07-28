import { ClipboardPenLine } from "lucide-react";

export default function OperatorObservations({

    observations,

    onChange,

}) {

    return (

        <section className="wo-observations-card">

            <div className="wo-section-title">

                <ClipboardPenLine size={20}/>

                <div>

                    <h3>Observaciones del operador</h3>

                    <p>
                        Registre novedades, incidencias o información
                        relevante durante la ejecución de la orden.
                    </p>

                </div>

            </div>

            <textarea

                className="wo-observations-input"

                rows={6}

                placeholder="Escriba aquí las observaciones de la ejecución..."

                value={observations}

                onChange={(e)=>onChange(e.target.value)}

            />

        </section>

    );

}