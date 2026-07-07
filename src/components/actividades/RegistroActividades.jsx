import { useMemo, useState } from "react";

import {
  Eye,
  Search,
  SlidersHorizontal,
  X,
  Activity,
  CalendarDays,
  CircleCheck,
  FileText,
  Box,
  MapPin,
} from "lucide-react";

export default function RegistroActividades({
  actividades = [],
  activos = [],
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] =
    useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("");
  const [actividadSeleccionada, setActividadSeleccionada] =
    useState(null);

  const obtenerActivo = (activoId) => {
    return activos.find(
      (activo) => activo.id === activoId
    );
  };

  const formatearTipoActividad = (tipoActividad) => {
    if (!tipoActividad) {
      return "Sin tipo";
    }

    return tipoActividad
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letra) =>
        letra.toUpperCase()
      );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "Sin fecha";
    }

    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(
      new Date(`${fecha}T00:00:00`)
    );
  };

  const tiposActividad = useMemo(() => {
    return [
      ...new Set(
        actividades
          .map(
            (actividad) =>
              actividad.tipoActividad
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [actividades]);

  const estadosActividad = useMemo(() => {
    return [
      ...new Set(
        actividades
          .map((actividad) => actividad.estado)
          .filter(Boolean)
      ),
    ].sort();
  }, [actividades]);

  const actividadesFiltradas = useMemo(() => {
    const termino = busqueda
      .toLowerCase()
      .trim();

    return actividades.filter((actividad) => {
      const activo = activos.find(
        (item) =>
          item.id === actividad.activoId
      );

      const coincideBusqueda =
        !termino ||
        activo?.nombre
          ?.toLowerCase()
          .includes(termino) ||
        activo?.codigo
          ?.toLowerCase()
          .includes(termino) ||
        activo?.identificador
          ?.toLowerCase()
          .includes(termino) ||
        actividad.tipoActividad
          ?.toLowerCase()
          .includes(termino) ||
        actividad.resultado
          ?.toLowerCase()
          .includes(termino);

      const coincideTipo =
        !tipoSeleccionado ||
        actividad.tipoActividad ===
          tipoSeleccionado;

      const coincideEstado =
        !estadoSeleccionado ||
        actividad.estado ===
          estadoSeleccionado;

      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideEstado
      );
    });
  }, [
    actividades,
    activos,
    busqueda,
    tipoSeleccionado,
    estadoSeleccionado,
  ]);

  const activoSeleccionado =
    actividadSeleccionada
      ? obtenerActivo(
          actividadSeleccionada.activoId
        )
      : null;

  return (
    <>
      <section className="registro-actividades">
        <div className="registro-actividades-encabezado">
          <div>
            <h2>
              Registro Operativo de Actividades
            </h2>

            <p>
              Consulte la trazabilidad de los hechos
              operativos registrados sobre los activos
              de GANUS.
            </p>
          </div>

          <div className="registro-actividades-total">
            <Activity
              size={18}
              strokeWidth={1.8}
            />

            <span>
              {actividadesFiltradas.length} registros
            </span>
          </div>
        </div>

        <div className="filtros-actividades">
          <div className="buscador-actividades">
            <Search
              size={18}
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Buscar por activo, código, identificador o actividad..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(evento.target.value)
              }
            />
          </div>

          <div className="filtro-select-actividades">
            <SlidersHorizontal
              size={17}
              strokeWidth={1.8}
            />

            <select
              value={tipoSeleccionado}
              onChange={(evento) =>
                setTipoSeleccionado(
                  evento.target.value
                )
              }
            >
              <option value="">
                Todas las actividades
              </option>

              {tiposActividad.map((tipo) => (
                <option
                  key={tipo}
                  value={tipo}
                >
                  {formatearTipoActividad(tipo)}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-select-actividades">
            <CircleCheck
              size={17}
              strokeWidth={1.8}
            />

            <select
              value={estadoSeleccionado}
              onChange={(evento) =>
                setEstadoSeleccionado(
                  evento.target.value
                )
              }
            >
              <option value="">
                Todos los estados
              </option>

              {estadosActividad.map((estado) => (
                <option
                  key={estado}
                  value={estado}
                >
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tabla-actividades-contenedor">
          <table className="tabla-actividades">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Activo</th>
                <th>Código</th>
                <th>Actividad</th>
                <th>Resultado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {actividadesFiltradas.length > 0 ? (
                actividadesFiltradas.map(
                  (actividad) => {
                    const activo = obtenerActivo(
                      actividad.activoId
                    );

                    return (
                      <tr key={actividad.id}>
                        <td>
                          <div className="fecha-actividad">
                            <CalendarDays
                              size={16}
                              strokeWidth={1.8}
                            />

                            <span>
                              {formatearFecha(
                                actividad.fecha
                              )}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="activo-actividad">
                            <strong>
                              {activo?.nombre ||
                                "Activo no disponible"}
                            </strong>

                            <span>
                              {activo?.tipo ||
                                actividad.activoId}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="codigo-actividad">
                            {activo?.codigo ||
                              actividad.activoId}
                          </span>
                        </td>

                        <td>
                          <span className="tipo-actividad">
                            {formatearTipoActividad(
                              actividad.tipoActividad
                            )}
                          </span>
                        </td>

                        <td>
                          <span className="resultado-actividad">
                            {actividad.resultado ||
                              "Sin resultado"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`estado-actividad ${
                              actividad.estado
                                ?.toLowerCase()
                                .trim() ===
                              "completada"
                                ? "completada"
                                : "pendiente"
                            }`}
                          >
                            {actividad.estado ||
                              "Sin estado"}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="accion-ver-actividad"
                            title="Ver detalle de actividad"
                            aria-label="Ver detalle de actividad"
                            onClick={() =>
                              setActividadSeleccionada(
                                actividad
                              )
                            }
                          >
                            <Eye
                              size={17}
                              strokeWidth={1.8}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="sin-actividades"
                  >
                    No se encontraron actividades que
                    coincidan con los criterios de
                    consulta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {actividadSeleccionada && (
        <div
          className="detalle-actividad-overlay"
          onMouseDown={() =>
            setActividadSeleccionada(null)
          }
        >
          <article
            className="detalle-actividad-panel"
            onMouseDown={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="detalle-actividad-header">
              <div>
                <span className="detalle-actividad-etiqueta">
                  Trazabilidad operativa
                </span>

                <h2>
                  Detalle de Actividad
                </h2>

                <p>
                  Información del hecho registrado sobre
                  el activo seleccionado.
                </p>
              </div>

              <button
                type="button"
                className="detalle-actividad-cerrar"
                aria-label="Cerrar detalle"
                title="Cerrar"
                onClick={() =>
                  setActividadSeleccionada(null)
                }
              >
                <X
                  size={20}
                  strokeWidth={1.8}
                />
              </button>
            </header>

            <div className="detalle-actividad-activo">
              <div className="detalle-actividad-activo-icono">
                <Box
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span>Activo relacionado</span>

                <strong>
                  {activoSeleccionado?.nombre ||
                    "Activo no disponible"}
                </strong>

                <p>
                  {activoSeleccionado?.codigo ||
                    actividadSeleccionada.activoId}
                  {" · "}
                  {activoSeleccionado?.tipo ||
                    "Sin clasificación"}
                </p>
              </div>
            </div>

            <div className="detalle-actividad-grid">
              <div className="detalle-actividad-campo">
                <div>
                  <CalendarDays
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Fecha</span>
                </div>

                <strong>
                  {formatearFecha(
                    actividadSeleccionada.fecha
                  )}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <Activity
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Tipo de actividad</span>
                </div>

                <strong>
                  {formatearTipoActividad(
                    actividadSeleccionada.tipoActividad
                  )}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <CircleCheck
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Estado</span>
                </div>

                <strong>
                  {actividadSeleccionada.estado ||
                    "Sin estado"}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <FileText
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Resultado</span>
                </div>

                <strong>
                  {actividadSeleccionada.resultado ||
                    "Sin resultado"}
                </strong>
              </div>
            </div>

            <div className="detalle-actividad-observacion">
              <div>
                <FileText
                  size={18}
                  strokeWidth={1.8}
                />

                <h3>Observación operativa</h3>
              </div>

              <p>
                {actividadSeleccionada.observacion ||
                  "La actividad no tiene una observación registrada."}
              </p>
            </div>

            {activoSeleccionado?.ubicacion && (
              <div className="detalle-actividad-ubicacion">
                <MapPin
                  size={17}
                  strokeWidth={1.8}
                />

                <span>
                  {activoSeleccionado.finca}
                  {" · "}
                  {activoSeleccionado.ubicacion}
                </span>
              </div>
            )}
          </article>
        </div>
      )}
    </>
  );
}