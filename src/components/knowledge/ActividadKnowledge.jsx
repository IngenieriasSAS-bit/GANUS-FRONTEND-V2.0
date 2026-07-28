import {
  BrainCircuit,
  CheckCircle2,
  Zap,
} from "lucide-react";

import "../../styles/knowledge/actividadKnowledge.css";

import { getWorkOrders } from "../../services/makeService";

const actividades = getWorkOrders()

  .sort(

    (a, b) =>

      new Date(
        b.execution?.lastSavedAt ||
        b.updatedAt ||
        b.createdAt
      ) -

      new Date(
        a.execution?.lastSavedAt ||
        a.updatedAt ||
        a.createdAt
      )

  )

  .slice(0, 5)

  .map((orden) => ({

    id: orden.id,

    titulo:

      orden.status === "completed"

        ? "Orden finalizada"

        : orden.status === "in_progress"

        ? "Orden en ejecución"

        : "Orden registrada",

    descripcion:

      `Orden ${

        orden.code ||

        `OT-${String(

          orden.sequence || 1

        ).padStart(6, "0")}`

      } · ${

        orden.templateName ||

        "Sin plantilla"

      }`,

    tiempo:

      new Intl.DateTimeFormat(

        "es-CO",

        {

          day: "2-digit",

          month: "2-digit",

          hour: "2-digit",

          minute: "2-digit",

        }

      ).format(

        new Date(

          orden.execution?.lastSavedAt ||

          orden.updatedAt ||

          orden.createdAt

        )

      ),

    icono:

      orden.status === "completed"

        ? CheckCircle2

        : Zap,

    variante:

      orden.status === "completed"

        ? "green"

        : "blue",

  }));

export default function ActividadKnowledge() {
  return (
    <article className="knowledge-activity">
      <div className="knowledge-activity-header">
        <div>
          <h2>Actividad reciente</h2>

          <p>
            Últimos eventos procesados por Knowledge Studio
          </p>
        </div>

        <BrainCircuit size={21} />
      </div>

      <div className="knowledge-activity-list">
        {actividades.map((actividad) => {
          const Icono = actividad.icono;

          return (
            <div
              className="knowledge-activity-item"
              key={actividad.id}
            >
              <div
                className={`knowledge-activity-icon knowledge-activity-icon--${actividad.variante}`}
              >
                <Icono size={18} />
              </div>

              <div className="knowledge-activity-info">
                <strong>{actividad.titulo}</strong>

                <span>{actividad.descripcion}</span>
              </div>

              <small>{actividad.tiempo}</small>
            </div>
          );
        })}
      </div>
    </article>
  );
}