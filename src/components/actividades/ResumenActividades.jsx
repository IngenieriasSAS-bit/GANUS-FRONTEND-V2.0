import {
  Activity,
  CheckCircle2,
  Clock3,
  Boxes,
} from "lucide-react";

export default function ResumenActividades({
  actividades = [],
}) {
  const totalActividades = actividades.length;

  const actividadesCompletadas =
    actividades.filter(
      (actividad) =>
        actividad.estado
          ?.toLowerCase()
          .trim() === "completada"
    ).length;

  const actividadesPendientes =
    actividades.filter(
      (actividad) =>
        actividad.estado
          ?.toLowerCase()
          .trim() !== "completada"
    ).length;

  const activosConActividad = new Set(
    actividades
      .map((actividad) => actividad.activoId)
      .filter(Boolean)
  ).size;

  const resumen = [
    {
      id: "total",
      titulo: "Total Actividades",
      valor: totalActividades,
      descripcion: "Registros operativos",
      icono: Activity,
      clase: "total",
    },
    {
      id: "completadas",
      titulo: "Completadas",
      valor: actividadesCompletadas,
      descripcion: "Actividades finalizadas",
      icono: CheckCircle2,
      clase: "completadas",
    },
    {
      id: "pendientes",
      titulo: "Pendientes",
      valor: actividadesPendientes,
      descripcion: "Requieren seguimiento",
      icono: Clock3,
      clase: "pendientes",
    },
    {
      id: "activos",
      titulo: "Activos con Actividad",
      valor: activosConActividad,
      descripcion: "Activos intervenidos",
      icono: Boxes,
      clase: "activos",
    },
  ];

  return (
    <section className="resumen-actividades">
      {resumen.map((item) => {
        const Icono = item.icono;

        return (
          <article
            className="resumen-actividad-card"
            key={item.id}
          >
            <div
              className={`resumen-actividad-icono ${item.clase}`}
            >
              <Icono size={20} strokeWidth={1.8} />
            </div>

            <div className="resumen-actividad-contenido">
              <span className="resumen-actividad-titulo">
                {item.titulo}
              </span>

              <strong className="resumen-actividad-valor">
                {item.valor}
              </strong>

              <span className="resumen-actividad-descripcion">
                {item.descripcion}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}