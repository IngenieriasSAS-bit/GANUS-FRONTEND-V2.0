import {
    CheckCircle2,
    AlertTriangle,
    Clock3,
    Layers3,
} from "lucide-react";

const ICONOS = {

    MAKE: Layers3,

    "Field Engine": Layers3,

    "Knowledge Studio": Clock3,

    Alertas: AlertTriangle,

};

export default function EstadoOperativo({

    estados = [],

}) {

    return (

        <section className="operacion-section">

            <div className="operacion-section-header">

                <h2>

                    Estado Operativo

                </h2>

                <span>

                    Estado de módulos

                </span>

            </div>

            <div className="estado-grid">

                {

                    estados.map((estado) => {

                        const Icono =

                            ICONOS[estado.modulo] ||

                            CheckCircle2;

                        return (

                            <article

                                key={estado.id}

                                className="estado-card"

                            >

                                <div
                                    className={`estado-icon ${estado.tipo}`}
                                >

                                    <Icono size={22} />

                                </div>

                                <div className="estado-info">

                                    <h3>

                                        {estado.modulo}

                                    </h3>

                                    <p>

                                        {estado.estado}

                                    </p>

                                </div>

                                <span
                                    className={`estado-badge ${estado.tipo}`}
                                >

                                    {

                                        estado.tipo === "success"

                                            ? "Activo"

                                            : estado.tipo === "warning"

                                            ? "Atención"

                                            : "Estado"

                                    }

                                </span>

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}