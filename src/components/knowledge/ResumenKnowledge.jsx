import {
  Target,
  ChartNoAxesCombined,
  GitBranch,
  Activity,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  obtenerIndicadoresMotor,
} from "../../services/knowledgeEngineService";
import {
  obtenerIndicadoresKnowledge,
  obtenerObjetivosEstrategicos,
  obtenerReglasKnowledge,
} from "../../services/knowledgeService";


import "../../styles/knowledge/resumenKnowledge.css";

export default function ResumenKnowledge() {
  const [motor, setMotor] = useState(
  obtenerIndicadoresMotor()
);

const [indicadoresKnowledge, setIndicadoresKnowledge] =
  useState(obtenerIndicadoresKnowledge());

const [objetivos, setObjetivos] =
  useState(obtenerObjetivosEstrategicos());

const [reglas, setReglas] =
  useState(obtenerReglasKnowledge());

useEffect(() => {

  const actualizar = () => {

    setMotor(
      obtenerIndicadoresMotor()
    );

    setIndicadoresKnowledge(
      obtenerIndicadoresKnowledge()
    );

    setObjetivos(
      obtenerObjetivosEstrategicos()
    );

    setReglas(
      obtenerReglasKnowledge()
    );

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

const resumen = [
  {
    id: 1,
    titulo: "Objetivos activos",
    valor: String(objetivos.length),
    descripcion: "Estrategia empresarial",
    icono: Target,
    variante: "blue",
  },
  {
  id: 2,
  titulo: "Indicadores activos",
  valor: String(indicadoresKnowledge.length),
  descripcion: `${indicadoresKnowledge.filter(
    indicador => indicador.estado === "Publicado"
  ).length} publicados`,
  icono: ChartNoAxesCombined,
  variante: "green",
},
  {
    id: 3,
    titulo: "Reglas activas",
    valor: String(reglas.length),
    descripcion: "En producción",
    icono: GitBranch,
    variante: "purple",
  },
  {
    id: 4,
    titulo: "Evaluaciones",
    valor: String(
  motor.eventosProcesados
),
    descripcion: "Última hora",
    icono: Activity,
    variante: "orange",
  },
];
  return (
    <section className="knowledge-summary">
      {resumen.map((item) => {
        const Icono = item.icono;

        return (
          <article
            className="knowledge-summary-card"
            key={item.id}
          >
            <div
              className={`knowledge-summary-icon knowledge-summary-icon--${item.variante}`}
            >
              <Icono size={22} />
            </div>

            <div className="knowledge-summary-info">
              <span>{item.titulo}</span>

              <strong>{item.valor}</strong>

              <small>{item.descripcion}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}