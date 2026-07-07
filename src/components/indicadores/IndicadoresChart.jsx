import {
    TrendingUp,
} from "lucide-react";

const datos = [

    { nombre: "Lun", valor: 72 },
    { nombre: "Mar", valor: 88 },
    { nombre: "Mié", valor: 80 },
    { nombre: "Jue", valor: 95 },
    { nombre: "Vie", valor: 91 },
    { nombre: "Sáb", valor: 84 },
    { nombre: "Dom", valor: 97 },

];

export default function IndicadoresChart() {

    return (

        <section className="indicadores-panel">

            <header className="panel-header">

                <div>

                    <h3>

                        Tendencia Operativa

                    </h3>

                    <span>

                        Últimos 7 días

                    </span>

                </div>

                <TrendingUp size={20} />

            </header>

            <div className="mini-chart">

                {

                    datos.map((dia) => (

                        <div
                            key={dia.nombre}
                            className="chart-item"
                        >

                            <div
                                className="chart-bar"
                                style={{
                                    height: `${dia.valor}%`,
                                }}
                            />

                            <span>

                                {dia.nombre}

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}