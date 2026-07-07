import IndicadoresCards from "./IndicadoresCards";
import ResumenTendencias from "./ResumenTendencias";
import CumplimientoOperativo from "./CumplimientoOperativo";
import TablaIndicadores from "./TablaIndicadores";
import ActividadReciente from "./ActividadReciente";

export default function IndicadoresDashboard() {

    return (

        <section className="indicadores-dashboard">

            <IndicadoresCards />

            <section className="indicadores-contenido">

                <div className="indicadores-izquierda">

                    <ResumenTendencias />

                    <ActividadReciente />

                </div>

                <div className="indicadores-derecha">

                    <CumplimientoOperativo />

                </div>

            </section>

            <TablaIndicadores />

        </section>

    );

}