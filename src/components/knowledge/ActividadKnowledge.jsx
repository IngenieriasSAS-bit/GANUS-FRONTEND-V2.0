import {
  useEffect,
  useState,
} from "react";

import {
  BrainCircuit,
  CheckCircle2,
  Target,
  Scale,
  GitBranch,
} from "lucide-react";

import "../../styles/knowledge/actividadKnowledge.css";

import {
  obtenerUltimosEventos,
  obtenerKnowledgeEngine,
} from "../../services/knowledgeEngineService";



export default function ActividadKnowledge() {
const [actividades, setActividades] = useState([]);
const [evaluaciones, setEvaluaciones] = useState([]);

useEffect(() => {

  const cargarEventos = () => {

  setActividades(
    obtenerUltimosEventos()
  );

  setEvaluaciones(
    obtenerKnowledgeEngine().evaluaciones || []
  );

};

  cargarEventos();

  window.addEventListener(
  "knowledge-engine-updated",
  cargarEventos
);

  return () =>
    window.removeEventListener(
  "knowledge-engine-updated",
  cargarEventos
);

}, []);

  return (
    <article className="knowledge-activity">
      <div className="knowledge-activity-header">
        <div>
          <h2>Actividad reciente</h2>

          <p>
            Trazabilidad generada automáticamente por Knowledge Engine
          </p>
        </div>

        <BrainCircuit size={21} />
      </div>

      <div className="knowledge-activity-list">

        {actividades.length === 0 && (
          <div className="knowledge-empty">
            <strong>
              Aún no existen eventos procesados.
            </strong>

            <span>
              Finalice una Orden de Trabajo desde Operación para
              generar automáticamente conocimiento empresarial.
            </span>
          </div>
        )}

        {actividades.map((evento) => {

const evaluacion = evaluaciones.find(
  (item) => item.eventoId === evento.id
);

return (

          <article
            key={evento.id}
            className="knowledge-activity-item"
          >

            <div className="knowledge-activity-top">

              <div className="knowledge-activity-icon knowledge-activity-icon--green">
                <CheckCircle2 size={18} />
              </div>

              <div className="knowledge-activity-info">

    <strong>
        {evento.codigo || "Orden de trabajo"}
    </strong>

    <span>
        {evento.tipo}
    </span>

    <div className="knowledge-meta">

        <div>
            <label>Activo</label>

            <strong>
                {evento.activo || "-"}
            </strong>
        </div>

        <div>
            <label>Rutina</label>

            <strong>
                {evento.rutina || "-"}
            </strong>
        </div>

        <div>
            <label>Plantilla</label>

            <strong>
                {evento.plantilla || "-"}
            </strong>
        </div>

    </div>

</div>

              <small>

                {new Intl.DateTimeFormat(
                  "es-CO",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ).format(new Date(evento.fecha))}

              </small>

            </div>

            <div className="knowledge-trace">

    <div className="knowledge-trace-item">

        <GitBranch size={15}/>

        <div>

            <span>Regla</span>

            <strong>{evento.regla}</strong>

        </div>

    </div>

    <div className="knowledge-trace-item">

        <Target size={15}/>

        <div>

            <span>Objetivo</span>

            <strong>{evento.objetivo}</strong>

        </div>

    </div>

    <div className="knowledge-trace-item">

        <Scale size={15}/>

        <div>

            <span>Principio</span>

            <strong>{evento.principio}</strong>

        </div>

    </div>

    <div className="knowledge-trace-item">

    <CheckCircle2 size={15} />

    <div>

        <span>Resultado</span>

        <strong>

            {evaluacion?.titulo ||
             evaluacion?.nombre ||
             "Sin evaluación"}

        </strong>

        {evaluacion && (

            <small>

                {evaluacion.tipo} · {evaluacion.severidad}

            </small>

        )}

    </div>

</div>

</div>

          </article>

);

})}

      </div>

<div className="knowledge-footer">

    <div className="knowledge-status">

        <CheckCircle2 size={16} />

        <span>
            Evaluación completada
        </span>

    </div>

    <div className="knowledge-status">

        <CheckCircle2 size={16} />

        <span>
            Snapshot actualizado
        </span>

    </div>

    <div className="knowledge-status">

        <BrainCircuit size={16} />

        <span>
            Disponible para Advisory
        </span>

    </div>

</div>

    </article>
  );
}