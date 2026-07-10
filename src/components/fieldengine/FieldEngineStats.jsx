import {
  Boxes,
  Captions,
  Database,
  Layers3,
} from "lucide-react";

export default function FieldEngineStats({
  template,
  templateCount,
  catalogCount,
}) {
  const sections = template?.sections || [];

  const fieldCount = sections.reduce(
    (total, section) => total + section.fields.length,
    0
  );

  const captureMethods = new Set(
    sections.flatMap((section) =>
      section.fields.flatMap((field) => field.captureMethods || [])
    )
  ).size;

  const stats = [
    {
      id: "templates",
      label: "Plantillas",
      value: templateCount,
      detail: "Configuradas en Field Engine",
      icon: Layers3,
    },
    {
      id: "fields",
      label: "Campos",
      value: fieldCount,
      detail: `${sections.length} secciones configuradas`,
      icon: Captions,
    },
    {
      id: "capture",
      label: "Métodos de captura",
      value: captureMethods,
      detail: "Métodos utilizados",
      icon: Boxes,
    },
    {
      id: "catalogs",
      label: "Catálogos",
      value: catalogCount,
      detail: "Catálogos reutilizables",
      icon: Database,
    },
  ];

  return (
    <section className="fe-stats" aria-label="Resumen de Field Engine">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="fe-stat-card" key={stat.id}>
            <div className="fe-stat-card__icon">
              <Icon size={20} />
            </div>

            <div className="fe-stat-card__content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}