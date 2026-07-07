import {
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const modulos = [
  {
    nombre: "Inventario",
    estado: "Operativo",
    icono: <CheckCircle2 size={18} />,
    clase: "ok",
  },
  {
    nombre: "Pesaje",
    estado: "Operativo",
    icono: <CheckCircle2 size={18} />,
    clase: "ok",
  },
  {
    nombre: "Actividades",
    estado: "Operativo",
    icono: <CheckCircle2 size={18} />,
    clase: "ok",
  },
  {
    nombre: "Alertas",
    estado: "Con incidencias",
    icono: <AlertTriangle size={18} />,
    clase: "warning",
  },
  {
    nombre: "Organización",
    estado: "Operativo",
    icono: <CheckCircle2 size={18} />,
    clase: "ok",
  },
  {
    nombre: "Sincronización",
    estado: "Hace 2 minutos",
    icono: <Clock3 size={18} />,
    clase: "info",
  },
];

export default function CumplimientoOperativo() {

  return (

    <section className="estado-sistema">

      <div className="indicadores-card-header">

        <div>

          <h3>

            Estado General

          </h3>

          <span>

            Monitoreo en tiempo real

          </span>

        </div>

      </div>

      <div className="estado-lista">

        {

          modulos.map((modulo) => (

            <article
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

              <div
                className={`estado-icono ${modulo.clase}`}
              >

                {modulo.icono}

              </div>

            </article>

          ))

        }

      </div>

    </section>

  );

}