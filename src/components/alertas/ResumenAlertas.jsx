import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function ResumenAlertas({
  alertas = [],
}) {
  const totalAlertas =
    alertas.length;

  const pendientes =
    alertas.filter(
      (alerta) =>
        alerta.estado === "Pendiente"
    ).length;

  const atendidas =
    alertas.filter(
      (alerta) =>
        alerta.estado === "Atendida"
    ).length;

  const criticas =
    alertas.filter((alerta) =>
      (
        alerta.prioridad || ""
      )
        .toLowerCase()
        .trim() === "alta"
    ).length;

  const resumen = [
    {
      id: "total",
      titulo: "Total Alertas",
      valor: totalAlertas,
      descripcion:
        "Eventos registrados",
      icono: Bell,
      clase: "total",
    },
    {
      id: "pendientes",
      titulo: "Pendientes",
      valor: pendientes,
      descripcion:
        "Requieren atención",
      icono: AlertTriangle,
      clase: "pendientes",
    },
    {
      id: "atendidas",
      titulo: "Atendidas",
      valor: atendidas,
      descripcion:
        "Alertas resueltas",
      icono: CheckCircle2,
      clase: "atendidas",
    },
    {
      id: "criticas",
      titulo: "Críticas",
      valor: criticas,
      descripcion:
        "Prioridad alta",
      icono: ShieldAlert,
      clase: "criticas",
    },
  ];

  return (
    <section className="resumen-alertas">
      {resumen.map((item) => {
        const Icono = item.icono;

        return (
          <article
            key={item.id}
            className="resumen-alerta-card"
          >
            <div
              className={`resumen-alerta-icono ${item.clase}`}
            >
              <Icono
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <div className="resumen-alerta-contenido">
              <span className="resumen-alerta-titulo">
                {item.titulo}
              </span>

              <strong className="resumen-alerta-valor">
                {item.valor}
              </strong>

              <span className="resumen-alerta-descripcion">
                {item.descripcion}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}