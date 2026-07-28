import {
  ClipboardList,
  FileText,
  Layers3,
  CheckCircle2,
} from "lucide-react";

export default function FieldEngineResponsesStats({
  totalResponses = 0,
  todayResponses = 0,
  templates = 0,
  completed = 0,
}) {
  const cards = [
    {
      label: "Registros",
      value: totalResponses,
      detail: "Capturas almacenadas",
      icon: ClipboardList,
    },
    {
      label: "Hoy",
      value: todayResponses,
      detail: "Registros del día",
      icon: FileText,
    },
    {
      label: "Plantillas",
      value: templates,
      detail: "Plantillas utilizadas",
      icon: Layers3,
    },
    {
      label: "Completados",
      value: completed,
      detail: "Estado finalizado",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="fe-stats">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            className="fe-stat-card"
            key={card.label}
          >
            <div className="fe-stat-card__icon">
              <Icon size={20} />
            </div>

            <div className="fe-stat-card__content">
              <span>{card.label}</span>

              <strong>{card.value}</strong>

              <small>{card.detail}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}