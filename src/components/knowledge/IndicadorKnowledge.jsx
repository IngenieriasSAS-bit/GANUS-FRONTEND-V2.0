import { useState } from "react";

import {
  ArrowLeft,
  ChartNoAxesCombined,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  obtenerIndicadoresKnowledge,
  crearIndicadorKnowledge,
  actualizarIndicadorKnowledge,
  eliminarIndicadorKnowledge,
} from "../../services/knowledgeService";

import NuevoIndicadorModal from "./NuevoIndicadorModal";
import IndicadorAcciones from "./IndicadorAcciones";

import "../../styles/knowledge/indicadorKnowledge.css";

export default function IndicadoresKnowledge({
  onVolver,
}) {
  const [indicadores, setIndicadores] = useState(() =>
    obtenerIndicadoresKnowledge()
  );

  const [busqueda, setBusqueda] = useState("");

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("todos");

  const [filtroAbierto, setFiltroAbierto] =
    useState(false);

  const [modalNuevoAbierto, setModalNuevoAbierto] =
    useState(false);

  const [indicadorEditar, setIndicadorEditar] =
    useState(null);

  const [indicadorEliminar, setIndicadorEliminar] =
    useState(null);

  const [menuAbiertoId, setMenuAbiertoId] =
    useState(null);

  const totalIndicadores = indicadores.length;

  const totalPublicados = indicadores.filter(
    (indicador) => indicador.estado === "Publicado"
  ).length;

  const totalBorradores = indicadores.filter(
    (indicador) => indicador.estado === "Borrador"
  ).length;

  const indicadoresFiltrados = indicadores.filter(
    (indicador) => {
      const textoBusqueda = busqueda
        .trim()
        .toLowerCase();

      const coincideBusqueda =
        indicador.nombre
          .toLowerCase()
          .includes(textoBusqueda) ||
        indicador.objetivo
          .toLowerCase()
          .includes(textoBusqueda) ||
        indicador.id
          .toLowerCase()
          .includes(textoBusqueda);

      const coincideEstado =
        estadoSeleccionado === "todos" ||
        indicador.estado === estadoSeleccionado;

      return coincideBusqueda && coincideEstado;
    }
  );

  const manejarNuevoIndicador = (datosIndicador) => {
    const nuevoIndicador = crearIndicadorKnowledge(
      indicadores,
      datosIndicador
    );

    setIndicadores((indicadoresAnteriores) => [
      ...indicadoresAnteriores,
      nuevoIndicador,
    ]);

    setModalNuevoAbierto(false);
  };

  const manejarEditarIndicador = (
    indicadorActualizado
  ) => {
    setIndicadores((indicadoresAnteriores) =>
      actualizarIndicadorKnowledge(
        indicadoresAnteriores,
        indicadorActualizado
      )
    );

    setIndicadorEditar(null);
  };

  const confirmarEliminarIndicador = () => {
    if (!indicadorEliminar) {
      return;
    }

    setIndicadores((indicadoresAnteriores) =>
      eliminarIndicadorKnowledge(
        indicadoresAnteriores,
        indicadorEliminar.id
      )
    );

    setIndicadorEliminar(null);
  };

  return (
    <>
      <section className="knowledge-indicadores">
        <div className="knowledge-indicadores-header">
          <div className="knowledge-indicadores-heading">
            <button
              type="button"
              className="knowledge-indicadores-back"
              onClick={onVolver}
              aria-label="Volver a Knowledge Studio"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Indicadores</h1>

              <p>
                Administre las mediciones estratégicas que
                permiten evaluar el cumplimiento de los
                objetivos empresariales.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-indicadores-create"
            onClick={() =>
              setModalNuevoAbierto(true)
            }
          >
            <Plus size={18} />

            Nuevo indicador
          </button>
        </div>

        <div className="knowledge-indicadores-summary">
          <article className="knowledge-indicadores-summary-card">
            <div className="knowledge-indicadores-summary-icon knowledge-indicadores-summary-icon--green">
              <ChartNoAxesCombined size={21} />
            </div>

            <div>
              <span>Indicadores definidos</span>

              <strong>{totalIndicadores}</strong>

              <small>Modelo empresarial</small>
            </div>
          </article>

          <article className="knowledge-indicadores-summary-card">
            <div className="knowledge-indicadores-summary-icon knowledge-indicadores-summary-icon--blue">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Publicados</span>

              <strong>{totalPublicados}</strong>

              <small>
                Disponibles para evaluación
              </small>
            </div>
          </article>

          <article className="knowledge-indicadores-summary-card">
            <div className="knowledge-indicadores-summary-icon knowledge-indicadores-summary-icon--orange">
              <Clock3 size={21} />
            </div>

            <div>
              <span>En borrador</span>

              <strong>{totalBorradores}</strong>

              <small>
                Pendiente de publicación
              </small>
            </div>
          </article>
        </div>

        <div className="knowledge-indicadores-panel">
          <div className="knowledge-indicadores-panel-header">
            <div>
              <h2>Catálogo de indicadores</h2>

              <p>
                Consulte las definiciones de medición
                registradas en Knowledge Studio.
              </p>
            </div>

            <div className="knowledge-indicadores-tools">
              <label className="knowledge-indicadores-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Buscar indicador..."
                  value={busqueda}
                  onChange={(event) =>
                    setBusqueda(event.target.value)
                  }
                />
              </label>

              <div className="knowledge-indicadores-filter-wrapper">
                <button
                  type="button"
                  className="knowledge-indicadores-filter"
                  aria-label="Filtrar indicadores"
                  onClick={() =>
                    setFiltroAbierto(
                      (estadoAnterior) =>
                        !estadoAnterior
                    )
                  }
                >
                  <SlidersHorizontal size={18} />
                </button>

                {filtroAbierto && (
                  <div className="knowledge-indicadores-filter-menu">
                    <button
                      type="button"
                      onClick={() => {
                        setEstadoSeleccionado("todos");
                        setFiltroAbierto(false);
                      }}
                    >
                      Todos los estados
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEstadoSeleccionado(
                          "Publicado"
                        );

                        setFiltroAbierto(false);
                      }}
                    >
                      Publicados
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEstadoSeleccionado(
                          "Borrador"
                        );

                        setFiltroAbierto(false);
                      }}
                    >
                      Borradores
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="knowledge-indicadores-table-wrapper">
            <table className="knowledge-indicadores-table">
              <thead>
                <tr>
                  <th>Indicador</th>

                  <th>Objetivo estratégico</th>

                  <th>Unidad</th>

                  <th>Frecuencia</th>

                  <th>Valor actual</th>

                  <th>Estado</th>

                  <th aria-label="Acciones" />
                </tr>
              </thead>

              <tbody>
                {indicadoresFiltrados.map(
                  (indicador) => (
                    <tr key={indicador.id}>
                      <td>
                        <div className="knowledge-indicador-name">
                          <div className="knowledge-indicador-symbol">
                            <ChartNoAxesCombined
                              size={18}
                            />
                          </div>

                          <div>
                            <strong>
                              {indicador.nombre}
                            </strong>

                            <span>
                              {indicador.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{indicador.objetivo}</td>

                      <td>{indicador.unidad}</td>

                      <td>
                        {indicador.frecuencia}
                      </td>

                      <td>
                        <strong className="knowledge-indicador-value">
                          {indicador.valor}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`knowledge-indicador-status knowledge-indicador-status--${indicador.estado.toLowerCase()}`}
                        >
                          {indicador.estado}
                        </span>
                      </td>

                      <td>
                        <div className="knowledge-indicador-actions-wrapper">
                          <button
                            type="button"
                            className="knowledge-indicador-actions"
                            aria-label={`Acciones de ${indicador.nombre}`}
                            onClick={() =>
                              setMenuAbiertoId(
                                (idActual) =>
                                  idActual ===
                                  indicador.id
                                    ? null
                                    : indicador.id
                              )
                            }
                          >
                            <MoreHorizontal
                              size={19}
                            />
                          </button>

                          {menuAbiertoId ===
                            indicador.id && (
                            <IndicadorAcciones
                              onEditar={() => {
                                setIndicadorEditar(
                                  indicador
                                );

                                setMenuAbiertoId(
                                  null
                                );
                              }}
                              onEliminar={() => {
                                setIndicadorEliminar(
                                  indicador
                                );

                                setMenuAbiertoId(
                                  null
                                );
                              }}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {modalNuevoAbierto && (
        <NuevoIndicadorModal
          onCerrar={() =>
            setModalNuevoAbierto(false)
          }
          onGuardar={manejarNuevoIndicador}
        />
      )}

      {indicadorEditar && (
        <NuevoIndicadorModal
          indicadorEditar={indicadorEditar}
          onCerrar={() =>
            setIndicadorEditar(null)
          }
          onGuardar={manejarEditarIndicador}
        />
      )}

      {indicadorEliminar && (
        <div className="knowledge-indicador-delete-overlay">
          <section className="knowledge-indicador-delete-modal">
            <div className="knowledge-indicador-delete-icon">
              <ChartNoAxesCombined size={22} />
            </div>

            <h2>Eliminar indicador</h2>

            <p>
              Está a punto de eliminar el indicador{" "}
              <strong>
                {indicadorEliminar.nombre}
              </strong>
              . Esta definición dejará de estar disponible
              en Knowledge Studio.
            </p>

            <div className="knowledge-indicador-delete-actions">
              <button
                type="button"
                className="knowledge-indicador-delete-cancel"
                onClick={() =>
                  setIndicadorEliminar(null)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="knowledge-indicador-delete-confirm"
                onClick={
                  confirmarEliminarIndicador
                }
              >
                Eliminar indicador
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}