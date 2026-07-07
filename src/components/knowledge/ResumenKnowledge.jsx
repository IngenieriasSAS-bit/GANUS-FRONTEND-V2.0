import {
  Target,
  ChartNoAxesCombined,
  GitBranch,
  Activity,
} from "lucide-react";

import "../../styles/knowledge/resumenKnowledge.css";

const resumen = [
  {
    id: 1,
    titulo: "Objetivos activos",
    valor: "3",
    descripcion: "Estrategia empresarial",
    icono: Target,
    variante: "blue",
  },
  {
    id: 2,
    titulo: "Indicadores activos",
    valor: "7",
    descripcion: "Mediciones publicadas",
    icono: ChartNoAxesCombined,
    variante: "green",
  },
  {
    id: 3,
    titulo: "Reglas activas",
    valor: "10",
    descripcion: "En producción",
    icono: GitBranch,
    variante: "purple",
  },
  {
    id: 4,
    titulo: "Evaluaciones",
    valor: "248",
    descripcion: "Última hora",
    icono: Activity,
    variante: "orange",
  },
];

export default function ResumenKnowledge() {
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