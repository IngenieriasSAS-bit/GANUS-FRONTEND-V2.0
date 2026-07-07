import { useState } from "react";

import {
  ArrowLeft,
  Target,
  Plus,
  Search,
  CheckCircle2,
  Clock3,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import {
  obtenerObjetivosEstrategicos,
  crearObjetivoEstrategico,
  actualizarObjetivoEstrategico,
  eliminarObjetivoEstrategico,
} from "../../services/knowledgeService";

import NuevoObjetivoModal from "./NuevoObjetivoModal";
import ObjetivoAcciones from "./ObjetivoAcciones";

import "../../styles/knowledge/ObjetivosEstrategicos.css";

export default function ObjetivosEstrategicos({
  onVolver,
}) {
  const [objetivos, setObjetivos] = useState(() =>
    obtenerObjetivosEstrategicos()
  );

  const [busqueda, setBusqueda] = useState("");

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("todos");

  const [
    modalNuevoObjetivoAbierto,
    setModalNuevoObjetivoAbierto,
  ] = useState(false);

  const [objetivoEditar, setObjetivoEditar] =
    useState(null);

  const [objetivoEliminar, setObjetivoEliminar] =
    useState(null);

  const [menuAbiertoId, setMenuAbiertoId] =
    useState(null);

  const totalObjetivos = objetivos.length;

  const objetivosActivos = objetivos.filter(
    (objetivo) => objetivo.estado === "Activo"
  ).length;

  const objetivosRevision = objetivos.filter(
    (objetivo) => objetivo.estado === "En revisión"
  ).length;

  const avancePromedio =
    totalObjetivos > 0
      ? Math.round(
          objetivos.reduce(
            (total, objetivo) =>
              total + objetivo.progreso,
            0
          ) / totalObjetivos
        )
      : 0;

  const objetivosFiltrados = objetivos.filter(
    (objetivo) => {
      const coincideBusqueda =
        objetivo.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        objetivo.descripcion
          .toLowerCase()
          .includes(busqueda.toLowerCase());

      const coincideEstado =
        estadoSeleccionado === "todos" ||
        (estadoSeleccionado === "activo" &&
          objetivo.estado === "Activo") ||
        (estadoSeleccionado === "revision" &&
          objetivo.estado === "En revisión");

      return coincideBusqueda && coincideEstado;
    }
  );

  const manejarNuevoObjetivo = (datosObjetivo) => {
    const nuevoObjetivo = crearObjetivoEstrategico(
      objetivos,
      datosObjetivo
    );

    setObjetivos((objetivosAnteriores) => [
      ...objetivosAnteriores,
      nuevoObjetivo,
    ]);

    setModalNuevoObjetivoAbierto(false);
  };

  const manejarEditarObjetivo = (
    objetivoActualizado
  ) => {
    setObjetivos((objetivosAnteriores) =>
      actualizarObjetivoEstrategico(
        objetivosAnteriores,
        objetivoActualizado
      )
    );

    setObjetivoEditar(null);
  };

  const confirmarEliminarObjetivo = () => {
    if (!objetivoEliminar) {
      return;
    }

    setObjetivos((objetivosAnteriores) =>
      eliminarObjetivoEstrategico(
        objetivosAnteriores,
        objetivoEliminar.id
      )
    );

    setObjetivoEliminar(null);
  };

  return (
    <>
      <section className="knowledge-objectives">
        <div className="knowledge-objectives-header">
          <div className="knowledge-objectives-title">
            <button
              type="button"
              className="knowledge-back-button"
              onClick={onVolver}
              aria-label="Volver a Knowledge Studio"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1>Objetivos Estratégicos</h1>

              <p>
                Defina y supervise los resultados estratégicos
                que orientan el modelo de conocimiento empresarial.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-primary-button"
            onClick={() =>
              setModalNuevoObjetivoAbierto(true)
            }
          >
            <Plus size={18} />

            Nuevo objetivo
          </button>
        </div>

        <div className="knowledge-objectives-summary">
          <article>
            <Target size={21} />

            <div>
              <span>Total objetivos</span>
              <strong>{totalObjetivos}</strong>
            </div>
          </article>

          <article>
            <CheckCircle2 size={21} />

            <div>
              <span>Objetivos activos</span>
              <strong>{objetivosActivos}</strong>
            </div>
          </article>

          <article>
            <Clock3 size={21} />

            <div>
              <span>En revisión</span>
              <strong>{objetivosRevision}</strong>
            </div>
          </article>

          <article>
            <TrendingUp size={21} />

            <div>
              <span>Avance promedio</span>
              <strong>{avancePromedio} %</strong>
            </div>
          </article>
        </div>

        <div className="knowledge-objectives-panel">
          <div className="knowledge-objectives-panel-header">
            <div>
              <h2>Gestión estratégica</h2>

              <p>
                Objetivos definidos dentro del modelo empresarial
                de GANUS.
              </p>
            </div>
          </div>

          <div className="knowledge-objectives-toolbar">
            <div className="knowledge-objectives-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Buscar objetivo estratégico..."
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />
            </div>

            <select
              value={estadoSeleccionado}
              onChange={(event) =>
                setEstadoSeleccionado(event.target.value)
              }
            >
              <option value="todos">
                Todos los estados
              </option>

              <option value="activo">
                Activos
              </option>

              <option value="revision">
                En revisión
              </option>
            </select>
          </div>

          <div className="knowledge-objectives-list">
            {objetivosFiltrados.map((objetivo) => (
              <article
                className="knowledge-objective-item"
                key={objetivo.id}
              >
                <div className="knowledge-objective-target">
                  <Target size={20} />
                </div>

                <div className="knowledge-objective-info">
                  <div className="knowledge-objective-name">
                    <h3>{objetivo.nombre}</h3>

                    <span
                      className={
                        objetivo.estado === "Activo"
                          ? "knowledge-status active"
                          : "knowledge-status review"
                      }
                    >
                      {objetivo.estado}
                    </span>
                  </div>

                  <p>{objetivo.descripcion}</p>

                  <div className="knowledge-objective-meta">
                    <span>
                      {objetivo.indicadores} indicadores asociados
                    </span>

                    <span>
                      Avance {objetivo.progreso} %
                    </span>
                  </div>

                  <div className="knowledge-objective-progress">
                    <span
                      style={{
                        width: `${objetivo.progreso}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="knowledge-objective-actions-wrapper">
                  <button
                    type="button"
                    className="knowledge-objective-actions"
                    aria-label={`Opciones de ${objetivo.nombre}`}
                    onClick={() =>
                      setMenuAbiertoId((idActual) =>
                        idActual === objetivo.id
                          ? null
                          : objetivo.id
                      )
                    }
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {menuAbiertoId === objetivo.id && (
                    <ObjetivoAcciones
                      onEditar={() => {
                        setObjetivoEditar(objetivo);
                        setMenuAbiertoId(null);
                      }}
                      onEliminar={() => {
                        setObjetivoEliminar(objetivo);
                        setMenuAbiertoId(null);
                      }}
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalNuevoObjetivoAbierto && (
        <NuevoObjetivoModal
          onCerrar={() =>
            setModalNuevoObjetivoAbierto(false)
          }
          onGuardar={manejarNuevoObjetivo}
        />
      )}

      {objetivoEditar && (
        <NuevoObjetivoModal
          objetivoEditar={objetivoEditar}
          onCerrar={() =>
            setObjetivoEditar(null)
          }
          onGuardar={manejarEditarObjetivo}
        />
      )}

      {objetivoEliminar && (
        <div className="knowledge-objective-delete-overlay">
          <section className="knowledge-objective-delete-modal">
            <div className="knowledge-objective-delete-icon">
              <Target size={22} />
            </div>

            <h2>Eliminar objetivo</h2>

            <p>
              Está a punto de eliminar el objetivo{" "}
              <strong>
                {objetivoEliminar.nombre}
              </strong>
              . Esta acción lo retirará de la gestión
              estratégica de Knowledge Studio.
            </p>

            <div className="knowledge-objective-delete-actions">
              <button
                type="button"
                className="knowledge-objective-delete-cancel"
                onClick={() =>
                  setObjetivoEliminar(null)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="knowledge-objective-delete-confirm"
                onClick={confirmarEliminarObjetivo}
              >
                Eliminar objetivo
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}