import {
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  ListTodo,
  Plus,
  Search,
  X,
} from "lucide-react";

export default function GestionTareas({
  tareas = [],
  activos = [],
  onCrearTarea,
  onCambiarEstado,
}) {
  const [busqueda, setBusqueda] =
    useState("");

  const [estadoFiltro, setEstadoFiltro] =
    useState("");

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [formulario, setFormulario] =
    useState({
      activoId: "",
      titulo: "",
      descripcion: "",
      fechaVencimiento: "",
      prioridad: "Media",
      estado: "Pendiente",
    });

  const obtenerActivo = (activoId) => {
    return activos.find(
      (activo) =>
        activo.id === activoId
    );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "Sin fecha";
    }

    return new Intl.DateTimeFormat(
      "es-CO",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ).format(
      new Date(`${fecha}T00:00:00`)
    );
  };

  const totalTareas = tareas.length;

  const pendientes = tareas.filter(
    (tarea) =>
      tarea.estado === "Pendiente"
  ).length;

  const enProgreso = tareas.filter(
    (tarea) =>
      tarea.estado === "En progreso"
  ).length;

  const completadas = tareas.filter(
    (tarea) =>
      tarea.estado === "Completada"
  ).length;

  const tareasFiltradas = useMemo(() => {
    const termino = busqueda
      .toLowerCase()
      .trim();

    return tareas.filter((tarea) => {
      const activo = activos.find(
        (item) =>
          item.id === tarea.activoId
      );

      const coincideBusqueda =
        !termino ||
        tarea.titulo
          ?.toLowerCase()
          .includes(termino) ||
        tarea.descripcion
          ?.toLowerCase()
          .includes(termino) ||
        activo?.nombre
          ?.toLowerCase()
          .includes(termino) ||
        activo?.codigo
          ?.toLowerCase()
          .includes(termino);

      const coincideEstado =
        !estadoFiltro ||
        tarea.estado === estadoFiltro;

      return (
        coincideBusqueda &&
        coincideEstado
      );
    });
  }, [
    tareas,
    activos,
    busqueda,
    estadoFiltro,
  ]);

  const manejarCambio = (evento) => {
    const {
      name,
      value,
    } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);

    setFormulario({
      activoId: "",
      titulo: "",
      descripcion: "",
      fechaVencimiento: "",
      prioridad: "Media",
      estado: "Pendiente",
    });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (
      !formulario.activoId ||
      !formulario.titulo.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.fechaVencimiento
    ) {
      return;
    }

    onCrearTarea({
      ...formulario,
      titulo: formulario.titulo.trim(),
      descripcion:
        formulario.descripcion.trim(),
    });

    cerrarFormulario();
  };

  const resumen = [
    {
      id: "total",
      titulo: "Total Tareas",
      valor: totalTareas,
      descripcion: "Acciones planificadas",
      icono: ListTodo,
      clase: "total",
    },
    {
      id: "pendientes",
      titulo: "Pendientes",
      valor: pendientes,
      descripcion: "Requieren ejecución",
      icono: Clock3,
      clase: "pendientes",
    },
    {
      id: "progreso",
      titulo: "En Progreso",
      valor: enProgreso,
      descripcion: "Actualmente en gestión",
      icono: CircleDot,
      clase: "progreso",
    },
    {
      id: "completadas",
      titulo: "Completadas",
      valor: completadas,
      descripcion: "Acciones finalizadas",
      icono: CheckCircle2,
      clase: "completadas",
    },
  ];

  return (
    <>
      <section className="resumen-tareas">
        {resumen.map((item) => {
          const Icono = item.icono;

          return (
            <article
              className="resumen-tarea-card"
              key={item.id}
            >
              <div
                className={`resumen-tarea-icono ${item.clase}`}
              >
                <Icono
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="resumen-tarea-contenido">
                <span className="resumen-tarea-titulo">
                  {item.titulo}
                </span>

                <strong className="resumen-tarea-valor">
                  {item.valor}
                </strong>

                <span className="resumen-tarea-descripcion">
                  {item.descripcion}
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="gestion-tareas">
        <header className="gestion-tareas-header">
          <div>
            <h2>
              Gestión Operativa de Tareas
            </h2>

            <p>
              Controle acciones planificadas y su
              estado de ejecución sobre los activos.
            </p>
          </div>

          <button
            type="button"
            className="boton-nueva-tarea"
            onClick={() =>
              setMostrarFormulario(true)
            }
          >
            <Plus
              size={17}
              strokeWidth={2}
            />

            Nueva Tarea
          </button>
        </header>

        <div className="filtros-tareas">
          <div className="buscador-tareas">
            <Search
              size={18}
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Buscar por tarea, activo o código..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(
                  evento.target.value
                )
              }
            />
          </div>

          <select
            className="selector-estado-tareas"
            value={estadoFiltro}
            onChange={(evento) =>
              setEstadoFiltro(
                evento.target.value
              )
            }
          >
            <option value="">
              Todos los estados
            </option>

            <option value="Pendiente">
              Pendientes
            </option>

            <option value="En progreso">
              En progreso
            </option>

            <option value="Completada">
              Completadas
            </option>
          </select>
        </div>

        <div className="tablero-tareas">
          {tareasFiltradas.length > 0 ? (
            tareasFiltradas.map((tarea) => {
              const activo = obtenerActivo(
                tarea.activoId
              );

              return (
                <article
                  className="tarea-card"
                  key={tarea.id}
                >
                  <div className="tarea-card-superior">
                    <span
                      className={`prioridad-tarea ${tarea.prioridad.toLowerCase()}`}
                    >
                      <AlertTriangle
                        size={13}
                        strokeWidth={1.8}
                      />

                      Prioridad {tarea.prioridad}
                    </span>

                    <span
                      className={`estado-tarea ${tarea.estado
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {tarea.estado}
                    </span>
                  </div>

                  <h3>
                    {tarea.titulo}
                  </h3>

                  <p className="tarea-descripcion">
                    {tarea.descripcion}
                  </p>

                  <div className="tarea-activo">
                    <span>
                      Activo relacionado
                    </span>

                    <strong>
                      {activo?.nombre ||
                        "Activo no disponible"}
                    </strong>

                    <small>
                      {activo?.codigo ||
                        tarea.activoId}
                    </small>
                  </div>

                  <div className="tarea-vencimiento">
                    <CalendarDays
                      size={16}
                      strokeWidth={1.8}
                    />

                    <span>
                      Vence el{" "}
                      {formatearFecha(
                        tarea.fechaVencimiento
                      )}
                    </span>
                  </div>

                  <div className="tarea-acciones">
                    <select
                      value={tarea.estado}
                      onChange={(evento) =>
                        onCambiarEstado(
                          tarea.id,
                          evento.target.value
                        )
                      }
                    >
                      <option value="Pendiente">
                        Pendiente
                      </option>

                      <option value="En progreso">
                        En progreso
                      </option>

                      <option value="Completada">
                        Completada
                      </option>
                    </select>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="sin-tareas">
              No se encontraron tareas que
              coincidan con la consulta.
            </div>
          )}
        </div>
      </section>

      {mostrarFormulario && (
        <div
          className="tarea-modal-overlay"
          onMouseDown={cerrarFormulario}
        >
          <form
            className="tarea-modal"
            onSubmit={manejarEnvio}
            onMouseDown={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="tarea-modal-header">
              <div>
                <span>
                  Planificación operativa
                </span>

                <h2>Nueva Tarea</h2>

                <p>
                  Registre una acción pendiente
                  asociada a un activo.
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarFormulario}
                aria-label="Cerrar formulario"
                title="Cerrar"
              >
                <X
                  size={20}
                  strokeWidth={1.8}
                />
              </button>
            </header>

            <div className="tarea-formulario">
              <label>
                Activo relacionado

                <select
                  name="activoId"
                  value={formulario.activoId}
                  onChange={manejarCambio}
                  required
                >
                  <option value="">
                    Seleccione un activo
                  </option>

                  {activos.map((activo) => (
                    <option
                      key={activo.id}
                      value={activo.id}
                    >
                      {activo.codigo} - {activo.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Título de la tarea

                <input
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={manejarCambio}
                  placeholder="Ej. Verificar condición operativa"
                  required
                />
              </label>

              <label className="campo-tarea-completo">
                Descripción

                <textarea
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  placeholder="Describa la acción que debe ejecutarse..."
                  rows="4"
                  required
                />
              </label>

              <label>
                Fecha de vencimiento

                <input
                  type="date"
                  name="fechaVencimiento"
                  value={
                    formulario.fechaVencimiento
                  }
                  onChange={manejarCambio}
                  required
                />
              </label>

              <label>
                Prioridad

                <select
                  name="prioridad"
                  value={formulario.prioridad}
                  onChange={manejarCambio}
                >
                  <option value="Alta">
                    Alta
                  </option>

                  <option value="Media">
                    Media
                  </option>

                  <option value="Baja">
                    Baja
                  </option>
                </select>
              </label>
            </div>

            <footer className="tarea-modal-footer">
              <button
                type="button"
                className="boton-cancelar-tarea"
                onClick={cerrarFormulario}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="boton-guardar-tarea"
              >
                <Plus
                  size={17}
                  strokeWidth={2}
                />

                Crear Tarea
              </button>
            </footer>
          </form>
        </div>
      )}
    </>
  );
}