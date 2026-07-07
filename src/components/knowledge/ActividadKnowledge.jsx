import {
  BrainCircuit,
  CheckCircle2,
  Zap,
  Target,
} from "lucide-react";

import "../../styles/knowledge/actividadKnowledge.css";

const actividades = [
  {
    id: 1,
    titulo: "Indicador publicado",
    descripcion:
      "Peso Comercial Disponible actualizado correctamente.",
    tiempo: "Hace 5 minutos",
    icono: CheckCircle2,
    variante: "green",
  },
  {
    id: 2,
    titulo: "Regla evaluada",
    descripcion:
      "Evaluación automática ejecutada sobre PesoActualizado.",
    tiempo: "Hace 12 minutos",
    icono: Zap,
    variante: "blue",
  },
  {
    id: 3,
    titulo: "Objetivo actualizado",
    descripcion:
      "Se actualizó el seguimiento del objetivo de comercialización.",
    tiempo: "Hace 28 minutos",
    icono: Target,
    variante: "purple",
  },
];

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