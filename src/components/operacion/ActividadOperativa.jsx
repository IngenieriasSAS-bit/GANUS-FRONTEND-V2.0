import {
    ClipboardList,
    ListChecks,
    FileCheck,
} from "lucide-react";

const ICONOS = {

    "Rutinas registradas": ListChecks,

    "Órdenes de trabajo": ClipboardList,

    "Plantillas publicadas": FileCheck,

};

export default function ActividadOperativa({

    actividad = [],

}) {

    return (

        <section className="operacion-section">

            <div className="operacion-section-header">

                <h2>

                    Actividad Reciente

                </h2>

                <span>

                    Últimos eventos

                </span>

            </div>

            <div className="operacion-timeline">

                {

                    actividad.map((item) => {

                        const Icono =

                            ICONOS[item.titulo] ||

                            ClipboardList;

                        return (

                            <article

                                key={item.id}

                                className="timeline-card"

                            >

                                <div className="timeline-icon">

                                    <Icono size={22} />

                                </div>

                                <div className="timeline-content">

                                    <div className="timeline-top">

                                        <h3>

                                            {item.titulo}

                                        </h3>

                                        <small>

                                            {item.fecha}

                                        </small>

                                    </div>

                                    <p>

                                        {item.descripcion}

                                    </p>

                                </div>

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}