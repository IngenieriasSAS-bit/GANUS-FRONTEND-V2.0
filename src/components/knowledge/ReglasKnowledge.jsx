import { useMemo, useState } from "react";

import {
  ArrowLeft,
  GitBranch,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  CheckCircle2,
  FileClock,
  Activity,
  Zap,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  obtenerReglasKnowledge,
  crearReglaKnowledge,
  actualizarReglaKnowledge,
  eliminarReglaKnowledge,
} from "../../services/knowledgeService";

import NuevaReglaModal from "./NuevaReglaModal";

import "../../styles/knowledge/reglasKnowledge.css";

export default function ReglasKnowledge({
  onVolver,
}) {
  const [reglas, setReglas] = useState(() =>
    obtenerReglasKnowledge()
  );

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] =
    useState("Todas");

  const [filtroAbierto, setFiltroAbierto] =
  useState(false);  

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [reglaEditar, setReglaEditar] =
    useState(null);

  const [menuAbierto, setMenuAbierto] =
    useState(null);

  const reglasFiltradas = useMemo(() => {
    const termino = busqueda
      .trim()
      .toLowerCase();

    return reglas.filter((regla) => {
      const coincideBusqueda =
        !termino ||
        regla.nombre
          .toLowerCase()
          .includes(termino) ||
        regla.id
          .toLowerCase()
          .includes(termino) ||
        regla.descripcion
          .toLowerCase()
          .includes(termino) ||
        regla.evento
          .toLowerCase()
          .includes(termino) ||
        regla.condicion
          .toLowerCase()
          .includes(termino) ||
        regla.accion
          .toLowerCase()
          .includes(termino);

      const coincideEstado =
        filtroEstado === "Todas" ||
        regla.estado === filtroEstado;

      return coincideBusqueda && coincideEstado;
    });
  }, [reglas, busqueda, filtroEstado]);

  const reglasActivas = reglas.filter(
    (regla) => regla.estado === "Activa"
  ).length;

  const reglasBorrador = reglas.filter(
    (regla) => regla.estado === "Borrador"
  ).length;

  

  const abrirNuevaRegla = () => {
    setReglaEditar(null);
    setMenuAbierto(null);
    setModalAbierto(true);
  };

  const abrirEditarRegla = (regla) => {
    setReglaEditar(regla);
    setMenuAbierto(null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setReglaEditar(null);
  };

  const guardarRegla = (datosRegla) => {
    if (reglaEditar) {
      setReglas((reglasActuales) =>
        actualizarReglaKnowledge(
          reglasActuales,
          {
            ...reglaEditar,
            ...datosRegla,
          }
        )
      );
    } else {
      setReglas((reglasActuales) => [
        ...reglasActuales,
        crearReglaKnowledge(
          reglasActuales,
          datosRegla
        ),
      ]);
    }

    cerrarModal();
  };

  const eliminarRegla = (reglaId) => {
    setReglas((reglasActuales) =>
      eliminarReglaKnowledge(
        reglasActuales,
        reglaId
      )
    );

    setMenuAbierto(null);
  };

  const cambiarMenu = (reglaId) => {
    setMenuAbierto((menuActual) =>
      menuActual === reglaId
        ? null
        : reglaId
    );
  };

  return (
    <>
      <section className="knowledge-reglas">
        <div className="knowledge-reglas-header">
          <div className="knowledge-reglas-heading">
            <button
              type="button"
              className="knowledge-reglas-back"
              onClick={onVolver}
              aria-label="Volver a Knowledge Studio"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Reglas</h1>

              <p>
                Administre las condiciones que permiten al
                motor de conocimiento evaluar eventos y
                ejecutar decisiones automáticas.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-reglas-create"
            onClick={abrirNuevaRegla}
          >
            <Plus size={18} />

            Nueva regla
          </button>
        </div>

        <div className="knowledge-reglas-summary">
          <article className="knowledge-reglas-summary-card">
            <div className="knowledge-reglas-summary-icon knowledge-reglas-summary-icon--purple">
              <GitBranch size={21} />
            </div>

            <div>
              <span>Reglas definidas</span>
              <strong>{reglas.length}</strong>
              <small>Motor de conocimiento</small>
            </div>
          </article>

          <article className="knowledge-reglas-summary-card">
            <div className="knowledge-reglas-summary-icon knowledge-reglas-summary-icon--green">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Activas</span>
              <strong>{reglasActivas}</strong>
              <small>
                Disponibles para evaluación
              </small>
            </div>
          </article>

          <article className="knowledge-reglas-summary-card">
            <div className="knowledge-reglas-summary-icon knowledge-reglas-summary-icon--orange">
              <FileClock size={21} />
            </div>

            <div>
              <span>En borrador</span>
              <strong>{reglasBorrador}</strong>
              <small>
                Pendientes de activación
              </small>
            </div>
          </article>

          <article className="knowledge-reglas-summary-card">
            <div className="knowledge-reglas-summary-icon knowledge-reglas-summary-icon--blue">
              <Activity size={21} />
            </div>

            <div>
              <span>Evaluaciones</span>
              <strong>248</strong>
              <small>Procesadas por el motor</small>
            </div>
          </article>
        </div>

        <div className="knowledge-reglas-panel">
          <div className="knowledge-reglas-panel-header">
            <div>
              <h2>Catálogo de reglas</h2>

              <p>
                Consulte las condiciones automatizadas
                registradas en el modelo de conocimiento.
              </p>
            </div>

            <div className="knowledge-reglas-tools">
              <label className="knowledge-reglas-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Buscar regla..."
                  value={busqueda}
                  onChange={(event) =>
                    setBusqueda(event.target.value)
                  }
                />
              </label>

              <div className="knowledge-reglas-filter-wrapper">
  <button
    type="button"
    className={`knowledge-reglas-filter ${
      filtroEstado !== "Todas"
        ? "knowledge-reglas-filter--active"
        : ""
    }`}
    onClick={() =>
      setFiltroAbierto(
        (estadoActual) => !estadoActual
      )
    }
    aria-label="Filtrar reglas por estado"
    aria-expanded={filtroAbierto}
  >
    <SlidersHorizontal size={18} />
  </button>

  {filtroAbierto && (
    <div className="knowledge-reglas-filter-menu">
      <div className="knowledge-reglas-filter-title">
        Filtrar por estado
      </div>

      <button
        type="button"
        className={
          filtroEstado === "Todas"
            ? "knowledge-reglas-filter-option--active"
            : ""
        }
        onClick={() => {
          setFiltroEstado("Todas");
          setFiltroAbierto(false);
        }}
      >
        <span>Todas las reglas</span>

        <small>{reglas.length}</small>
      </button>

      <button
        type="button"
        className={
          filtroEstado === "Activa"
            ? "knowledge-reglas-filter-option--active"
            : ""
        }
        onClick={() => {
          setFiltroEstado("Activa");
          setFiltroAbierto(false);
        }}
      >
        <span>Activas</span>

        <small>{reglasActivas}</small>
      </button>

      <button
        type="button"
        className={
          filtroEstado === "Borrador"
            ? "knowledge-reglas-filter-option--active"
            : ""
        }
        onClick={() => {
          setFiltroEstado("Borrador");
          setFiltroAbierto(false);
        }}
      >
        <span>En borrador</span>

        <small>{reglasBorrador}</small>
      </button>
    </div>
  )}
</div>
            </div>
          </div>

          <div className="knowledge-reglas-list">
            {reglasFiltradas.length > 0 ? (
              reglasFiltradas.map((regla) => (
                <article
                  className="knowledge-regla-card"
                  key={regla.id}
                >
                  <div className="knowledge-regla-card-header">
                    <div className="knowledge-regla-identity">
                      <div className="knowledge-regla-icon">
                        <GitBranch size={20} />
                      </div>

                      <div>
                        <strong>
                          {regla.nombre}
                        </strong>

                        <span>{regla.id}</span>
                      </div>
                    </div>

                    <div className="knowledge-regla-header-actions">
                      <span
                        className={`knowledge-regla-status knowledge-regla-status--${regla.estado.toLowerCase()}`}
                      >
                        {regla.estado}
                      </span>

                      <div className="knowledge-regla-menu-wrapper">
                        <button
                          type="button"
                          className="knowledge-regla-actions"
                          onClick={() =>
                            cambiarMenu(regla.id)
                          }
                          aria-label={`Acciones de ${regla.nombre}`}
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {menuAbierto === regla.id && (
                          <div className="knowledge-regla-menu">
                            <button
                              type="button"
                              onClick={() =>
                                abrirEditarRegla(regla)
                              }
                            >
                              <Pencil size={15} />

                              Editar regla
                            </button>

                            <button
                              type="button"
                              className="knowledge-regla-menu-delete"
                              onClick={() =>
                                eliminarRegla(regla.id)
                              }
                            >
                              <Trash2 size={15} />

                              Eliminar regla
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="knowledge-regla-description">
                    {regla.descripcion}
                  </p>

                  <div className="knowledge-regla-flow">
                    <div className="knowledge-regla-flow-item">
                      <span>Evento</span>

                      <strong>
                        <Zap size={15} />

                        {regla.evento}
                      </strong>
                    </div>

                    <GitBranch
                      className="knowledge-regla-flow-arrow"
                      size={18}
                    />

                    <div className="knowledge-regla-flow-item">
                      <span>Condición</span>

                      <strong>
                        {regla.condicion}
                      </strong>
                    </div>

                    <GitBranch
                      className="knowledge-regla-flow-arrow"
                      size={18}
                    />

                    <div className="knowledge-regla-flow-item">
                      <span>Acción</span>

                      <strong>
                        {regla.accion}
                      </strong>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="knowledge-reglas-empty">
                <GitBranch size={25} />

                <strong>
                  No se encontraron reglas
                </strong>

                <span>
                  Ajuste la búsqueda o cambie el filtro
                  seleccionado.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {modalAbierto && (
        <NuevaReglaModal
          key={
            reglaEditar
              ? reglaEditar.id
              : "nueva-regla"
          }
          onCerrar={cerrarModal}
          onGuardar={guardarRegla}
          reglaEditar={reglaEditar}
        />
      )}
    </>
  );
}