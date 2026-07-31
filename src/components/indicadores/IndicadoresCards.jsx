import {
    Activity,
    Gauge,
    ShieldCheck,
    BellRing,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
    obtenerAlertas,
    EVENTO_ALERTAS_ACTUALIZADAS,
} from "../../services/alertasService";



export default function IndicadoresCards() {
    const [alertasActivas, setAlertasActivas] =
    useState(() => obtenerAlertas().length);
const indicadores = [

    {
        titulo: "Disponibilidad",
        valor: "98.7 %",
        descripcion: "Servicios operativos",
        icono: ShieldCheck,
        clase: "success",
    },

    {
        titulo: "Rendimiento",
        valor: "91 %",
        descripcion: "Eficiencia general",
        icono: Gauge,
        clase: "primary",
    },

    {
        titulo: "Salud del sistema",
        valor: "Excelente",
        descripcion: "Estado actual",
        icono: Activity,
        clase: "success",
    },

    {
        titulo: "Alertas activas",
        valor: alertasActivas,
        descripcion: "Requieren atención",
        icono: BellRing,
        clase: "warning",
    },

]; 

    
    useEffect(() => {

    const actualizar = () => {

        setAlertasActivas(
            obtenerAlertas().length
        );

    };

    window.addEventListener(
        EVENTO_ALERTAS_ACTUALIZADAS,
        actualizar
    );

    return () => {

        window.removeEventListener(
            EVENTO_ALERTAS_ACTUALIZADAS,
            actualizar
        );

    };

}, []);

    return (

        <section className="indicadores-cards">

            {

                indicadores.map((item) => {

                    const Icono = item.icono;

                    return (

                        <article
                            key={item.titulo}
                            className="indicador-card"
                        >

                            <div
                                className={`indicador-icon ${item.clase}`}
                            >

                                <Icono size={22} />

                            </div>

                            <div>

                                <h4>

                                    {item.titulo}

                                </h4>

                                <h2>

                                    {item.valor}

                                </h2>

                                <span>

                                    {item.descripcion}

                                </span>

                            </div>

                        </article>

                    );

                })

            }

        </section>

    );

}