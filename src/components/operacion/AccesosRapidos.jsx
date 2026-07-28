import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    Boxes,
    ClipboardList,
    BrainCircuit,
} from "lucide-react";

const ICONOS = {

    MAKE: Boxes,

    "Gestión de Rutinas": ClipboardList,

    "Knowledge Studio": BrainCircuit,

};

export default function AccesosRapidos({

    accesos = [],

}) {

    const navigate = useNavigate();

    return (

        <section className="operacion-section">

            <div className="operacion-section-header">

                <h2>

                    Accesos rápidos

                </h2>

                <span>

                    Navegación

                </span>

            </div>

            <div className="operacion-shortcuts">

                {

                    accesos.map((item) => {

                        const Icono =

                            ICONOS[item.nombre] ||

                            Boxes;

                        return (

                            <button

                                key={item.id}

                                className="shortcut-card"

                                onClick={() =>

                                    navigate(item.ruta)

                                }

                            >

                                <div className="shortcut-icon">

                                    <Icono size={30} />

                                </div>

                                <h3>

                                    {item.nombre}

                                </h3>

                                <p>

                                    Abrir módulo

                                </p>

                                <span>

                                    Ir ahora

                                    <ArrowRight size={18} />

                                </span>

                            </button>

                        );

                    })

                }

            </div>

        </section>

    );

}