import {
  TrendingUp,
} from "lucide-react";

export default function ResumenTendencias() {

  return (

    <section className="indicadores-chart">

      <div className="indicadores-card-header">

        <div>

          <h3>

            Tendencia Operativa

          </h3>

          <span>

            Últimos 7 días

          </span>

        </div>

        <TrendingUp size={18} />

      </div>

      <div className="grafica-falsa">

        <div
          className="linea-grafica"
        >

          <span
            style={{
              height:"52%"
            }}
          />

          <span
            style={{
              height:"65%"
            }}
          />

          <span
            style={{
              height:"58%"
            }}
          />

          <span
            style={{
              height:"76%"
            }}
          />

          <span
            style={{
              height:"82%"
            }}
          />

          <span
            style={{
              height:"90%"
            }}
          />

          <span
            style={{
              height:"96%"
            }}
          />

        </div>

        <div className="dias-grafica">

          <label>Lun</label>

          <label>Mar</label>

          <label>Mié</label>

          <label>Jue</label>

          <label>Vie</label>

          <label>Sáb</label>

          <label>Dom</label>

        </div>

      </div>

    </section>

  );

}