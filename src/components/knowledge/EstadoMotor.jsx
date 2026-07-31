import {
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import "../../styles/knowledge/estadoMotor.css";

import {
  obtenerEstadoMotor,
} from "../../services/knowledgeEngineService";


 

export default function EstadoMotor() {

  const [servicios, setServicios] = useState(
  obtenerEstadoMotor()
);

useEffect(() => {

  const cargarEstado = () => {

    setServicios(
      obtenerEstadoMotor()
    );

  };

  cargarEstado();

  window.addEventListener(
    "knowledge-engine-updated",
    cargarEstado
  );

  return () =>
    window.removeEventListener(
      "knowledge-engine-updated",
      cargarEstado
    );

}, []);

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