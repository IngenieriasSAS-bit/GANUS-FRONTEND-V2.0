import {
  Target,
  ChartNoAxesCombined,
  Scale,
  GitBranch,
  ArrowRight,
} from "lucide-react";

import "../../styles/knowledge/modeloConocimiento.css";

const modulos = [
  {
    id: "objetivos",
    titulo: "Objetivos Estratégicos",
    descripcion:
      "Defina los resultados medibles y trazables que orientan la estrategia empresarial.",
    total: 4,
    detalle: "3 activos",
    icono: Target,
    variante: "blue",
  },
  {
    id: "indicadores",
    titulo: "Indicadores",
    descripcion:
      "Administre las mediciones que permiten evaluar el cumplimiento de los objetivos.",
    total: 8,
    detalle: "7 publicados",
    icono: ChartNoAxesCombined,
    variante: "green",
  },
  {
    id: "principios",
    titulo: "Principios de Negocio",
    descripcion:
      "Estructure los criterios empresariales que representan la forma de administrar GANUS.",
    total: 6,
    detalle: "5 vigentes",
    icono: Scale,
    variante: "orange",
  },
  {
    id: "reglas",
    titulo: "Reglas",
    descripcion:
      "Configure las condiciones evaluadas automáticamente ante los eventos del sistema.",
    total: 12,
    detalle: "10 activas",
    icono: GitBranch,
    variante: "purple",
  },
];

export default function ModeloConocimiento({
  onGestionar,
}) {
  return (
    <section className="knowledge-model">
      <div className="knowledge-model-header">
        <div>
          <h2>
            Modelo de Conocimiento Empresarial
          </h2>

          <p>
            Configure los componentes que convierten la
            estrategia en decisiones automáticas.
          </p>
        </div>

        <div className="knowledge-engine-status">
          <span />

          Motor operativo
        </div>
      </div>

      <div className="knowledge-model-grid">
        {modulos.map((modulo) => {
          const Icono = modulo.icono;

          return (
            <article
              className="knowledge-model-card"
              key={modulo.id}
            >
              <div
                className={`knowledge-model-icon knowledge-model-icon--${modulo.variante}`}
              >
                <Icono size={22} />
              </div>

              <div className="knowledge-model-content">
                <div className="knowledge-model-title">
                  <h3>{modulo.titulo}</h3>

                  <span>{modulo.total}</span>
                </div>

                <p>{modulo.descripcion}</p>

                <div className="knowledge-model-footer">
                  <small>{modulo.detalle}</small>

                  <button
                    type="button"
                    onClick={() =>
                      onGestionar(modulo.id)
                    }
                  >
                    Gestionar

                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}