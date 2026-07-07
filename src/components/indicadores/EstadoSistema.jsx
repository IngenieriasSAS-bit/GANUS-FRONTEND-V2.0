import {
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

const modulos = [

    {
        nombre: "Inventario",
        estado: "Operativo",
        ok: true,
    },

    {
        nombre: "Pesaje",
        estado: "Operativo",
        ok: true,
    },

    {
        nombre: "Actividades",
        estado: "Operativo",
        ok: true,
    },

    {
        nombre: "Alertas",
        estado: "Con incidencias",
        ok: false,
    },

    {
        nombre: "Organización",
        estado: "Operativo",
        ok: true,
    },

];

export default function EstadoSistema() {

    return (

        <section className="indicadores-panel">

            <header className="panel-header">

                <h3>

                    Estado del Sistema

                </h3>

            </header>

            <div className="estado-lista">

                {

                    modulos.map((modulo) => (

                        <div
                            key={modulo.nombre}
                            className="estado-item"
                        >

                            <div>

                                <strong>

                                    {modulo.nombre}

                                </strong>

                                <span>

                                    {modulo.estado}

                                </span>

                            </div>

                            {

                                modulo.ok

                                ?

                                <CheckCircle2
                                    size={20}
                                    className="estado-ok"
                                />

                                :

                                <AlertTriangle
                                    size={20}
                                    className="estado-warning"
                                />

                            }

                        </div>

                    ))

                }

            </div>

        </section>

    );

}