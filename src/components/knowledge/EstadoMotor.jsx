import {
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import "../../styles/knowledge/estadoMotor.css";

const servicios = [
  {
    id: 1,
    nombre: "Knowledge Engine",
    descripcion: "Modelo empresarial",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Rule Engine",
    descripcion: "Evaluación de reglas",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Event Engine",
    descripcion: "Procesamiento de eventos",
    estado: "activo",
  },
  {
    id: 4,
    nombre: "Widget Publisher",
    descripcion: "Publicación de indicadores",
    estado: "sincronizando",
  },
];

export default function EstadoMotor() {
  return (
    <article className="knowledge-motor">
      <div className="knowledge-motor-header">
        <div>
          <h2>Estado del motor</h2>

          <p>Servicios internos de conocimiento</p>
        </div>

        <Activity size={21} />
      </div>

      <div className="knowledge-motor-list">
        {servicios.map((servicio) => (
          <div
            className="knowledge-motor-item"
            key={servicio.id}
          >
            <div>
              <strong>{servicio.nombre}</strong>

              <span>{servicio.descripcion}</span>
            </div>

            {servicio.estado === "activo" ? (
              <CheckCircle2 size={19} />
            ) : (
              <Clock3
                size={19}
                className="knowledge-motor-sync"
              />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}