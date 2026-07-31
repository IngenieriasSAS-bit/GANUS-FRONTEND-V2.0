import {
  Target,
  ChartNoAxesCombined,
  Scale,
  GitBranch,
  ArrowRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import "../../styles/knowledge/modeloConocimiento.css";

import {
  obtenerResumenKnowledge,
} from "../../services/knowledgeEngineService";

import {
  obtenerObjetivosEstrategicos,
  obtenerIndicadoresKnowledge,
  obtenerPrincipiosNegocio,
  obtenerReglasKnowledge,
} from "../../services/knowledgeService";


export default function ModeloConocimiento({
  onGestionar,
}) {

  const [resumen, setResumen] = useState(
  obtenerResumenKnowledge()
);

useEffect(() => {

  const actualizar = () => {

  const resumenMotor =
    obtenerResumenKnowledge();

  const objetivos =
    obtenerObjetivosEstrategicos();

  const indicadores =
    obtenerIndicadoresKnowledge();

  const principios =
    obtenerPrincipiosNegocio();

  const reglas =
    obtenerReglasKnowledge();

  setResumen({

    ...resumenMotor,

    objetivos: objetivos.length,

    indicadores: indicadores.length,

    principios: principios.filter(
      principio => principio.estado === "Vigente"
    ).length,

    reglas: reglas.length,

  });

};

  actualizar();

  window.addEventListener(
  "knowledge-engine-updated",
  actualizar
);

  return () =>
    window.removeEventListener(
  "knowledge-engine-updated",
  actualizar
);

}, []);

const modulos = [
  {
    id: "objetivos",
    titulo: "Objetivos Estratégicos",
    descripcion:
      "Defina los resultados medibles y trazables que orientan la estrategia empresarial.",
    total: resumen.objetivos,
    detalle: `${resumen.objetivos} detectados`,
    icono: Target,
    variante: "blue",
  },

  {
    id: "indicadores",
    titulo: "Indicadores",
    descripcion:
      "Administre las mediciones que permiten evaluar el cumplimiento de los objetivos.",
    total: resumen.indicadores,
    detalle: `${resumen.indicadores} publicados`,
    icono: ChartNoAxesCombined,
    variante: "green",
  },

  {
    id: "principios",
    titulo: "Principios de Negocio",
    descripcion:
      "Estructure los criterios empresariales que representan la forma de administrar GANUS.",
    total: resumen.principios,
    detalle: `${resumen.principios} vigentes`,
    icono: Scale,
    variante: "orange",
  },

  {
    id: "reglas",
    titulo: "Reglas",
    descripcion:
      "Configure las condiciones evaluadas automáticamente ante los eventos del sistema.",
    total: resumen.reglas,
    detalle: `${resumen.reglas} ejecutadas`,
    icono: GitBranch,
    variante: "purple",
  },
];

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