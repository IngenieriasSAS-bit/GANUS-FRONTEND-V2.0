import { useState } from "react";

import {
  ArrowLeft,
  Scale,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  CheckCircle2,
  FileClock,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  obtenerPrincipiosNegocio,
  crearPrincipioNegocio,
  actualizarPrincipioNegocio,
  eliminarPrincipioNegocio,
} from "../../services/knowledgeService";

import NuevoPrincipioModal from "./NuevoPrincipioModal";

import "../../styles/knowledge/principioNegocio.css";

export default function PrincipiosNegocio({
  onVolver,
}) {
  const [principios, setPrincipios] = useState(() =>
    obtenerPrincipiosNegocio()
  );

  const [busqueda, setBusqueda] = useState("");

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("todos");

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [principioEditar, setPrincipioEditar] =
    useState(null);

  const [menuAbierto, setMenuAbierto] =
    useState(null);

  const totalPrincipios = principios.length;

  const principiosVigentes = principios.filter(
    (principio) => principio.estado === "Vigente"
  ).length;

  const principiosBorrador = principios.filter(
    (principio) => principio.estado === "Borrador"
  ).length;

  const principiosFiltrados = principios.filter(
    (principio) => {
      const termino = busqueda
        .trim()
        .toLowerCase();

      const coincideBusqueda =
        principio.nombre
          .toLowerCase()
          .includes(termino) ||
        principio.descripcion
          .toLowerCase()
          .includes(termino) ||
        principio.id
          .toLowerCase()
          .includes(termino) ||
        principio.categoria
          .toLowerCase()
          .includes(termino) ||
        principio.alcance
          .toLowerCase()
          .includes(termino);

      const coincideEstado =
        estadoSeleccionado === "todos" ||
        principio.estado === estadoSeleccionado;

      return coincideBusqueda && coincideEstado;
    }
  );

  const abrirNuevoPrincipio = () => {
    setPrincipioEditar(null);
    setMenuAbierto(null);
    setModalAbierto(true);
  };

  const abrirEditarPrincipio = (principio) => {
    setPrincipioEditar(principio);
    setMenuAbierto(null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPrincipioEditar(null);
  };

  const guardarPrincipio = (datosPrincipio) => {
    if (principioEditar) {
      setPrincipios((principiosAnteriores) =>
        actualizarPrincipioNegocio(
          principiosAnteriores,
          {
            ...principioEditar,
            ...datosPrincipio,
          }
        )
      );

      cerrarModal();

      return;
    }

    setPrincipios((principiosAnteriores) => {
      const nuevoPrincipio = crearPrincipioNegocio(
        principiosAnteriores,
        datosPrincipio
      );

      return [
        ...principiosAnteriores,
        nuevoPrincipio,
      ];
    });

    cerrarModal();
  };

  const eliminarPrincipio = (principio) => {
    const confirmarEliminacion = window.confirm(
      `¿Desea eliminar el principio "${principio.nombre}"?`
    );

    if (!confirmarEliminacion) {
      return;
    }

    setPrincipios((principiosAnteriores) =>
      eliminarPrincipioNegocio(
        principiosAnteriores,
        principio.id
      )
    );

    setMenuAbierto(null);
  };

  const cambiarFiltroEstado = () => {
    setEstadoSeleccionado((estadoActual) => {
      if (estadoActual === "todos") {
        return "Vigente";
      }

      if (estadoActual === "Vigente") {
        return "Borrador";
      }

      return "todos";
    });
  };

  const obtenerTextoFiltro = () => {
    if (estadoSeleccionado === "Vigente") {
      return "Vigentes";
    }

    if (estadoSeleccionado === "Borrador") {
      return "Borradores";
    }

    return "Todos";
  };

  return (
    <section className="knowledge-principios">
      <div className="knowledge-principios-header">
        <div className="knowledge-principios-heading">
          <button
            type="button"
            className="knowledge-principios-back"
            onClick={onVolver}
            aria-label="Volver a Knowledge Studio"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1>Principios de Negocio</h1>

            <p>
              Administre los criterios empresariales que
              representan la forma de gobernar, operar y
              tomar decisiones dentro de GANUS.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="knowledge-principios-create"
          onClick={abrirNuevoPrincipio}
        >
          <Plus size={18} />

          Nuevo principio
        </button>
      </div>

      <div className="knowledge-principios-summary">
        <article className="knowledge-principios-summary-card">
          <div className="knowledge-principios-summary-icon knowledge-principios-summary-icon--orange">
            <Scale size={21} />
          </div>

          <div>
            <span>Principios definidos</span>
            <strong>{totalPrincipios}</strong>
            <small>Modelo empresarial</small>
          </div>
        </article>

        <article className="knowledge-principios-summary-card">
          <div className="knowledge-principios-summary-icon knowledge-principios-summary-icon--green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Vigentes</span>
            <strong>{principiosVigentes}</strong>
            <small>Aplicados al conocimiento</small>
          </div>
        </article>

        <article className="knowledge-principios-summary-card">
          <div className="knowledge-principios-summary-icon knowledge-principios-summary-icon--blue">
            <FileClock size={21} />
          </div>

          <div>
            <span>En borrador</span>
            <strong>{principiosBorrador}</strong>
            <small>Pendiente de revisión</small>
          </div>
        </article>
      </div>

      <div className="knowledge-principios-panel">
        <div className="knowledge-principios-panel-header">
          <div>
            <h2>Catálogo de principios</h2>

            <p>
              Consulte los criterios empresariales
              registrados en el modelo de conocimiento.
            </p>
          </div>

          <div className="knowledge-principios-tools">
            <label className="knowledge-principios-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar principio..."
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />
            </label>

            <button
              type="button"
              className={`knowledge-principios-filter ${
                estadoSeleccionado !== "todos"
                  ? "knowledge-principios-filter--active"
                  : ""
              }`}
              onClick={cambiarFiltroEstado}
              aria-label={`Filtro actual: ${obtenerTextoFiltro()}`}
              title={`Filtro: ${obtenerTextoFiltro()}`}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {principiosFiltrados.length > 0 ? (
          <div className="knowledge-principios-list">
            {principiosFiltrados.map((principio) => (
              <article
                className="knowledge-principio-card"
                key={principio.id}
              >
                <div className="knowledge-principio-icon">
                  <Scale size={20} />
                </div>

                <div className="knowledge-principio-content">
                  <div className="knowledge-principio-title">
                    <div>
                      <strong>
                        {principio.nombre}
                      </strong>

                      <span>{principio.id}</span>
                    </div>

                    <div className="knowledge-principio-menu-wrapper">
                      <button
                        type="button"
                        className="knowledge-principio-actions"
                        onClick={() =>
                          setMenuAbierto(
                            menuAbierto === principio.id
                              ? null
                              : principio.id
                          )
                        }
                        aria-label={`Acciones de ${principio.nombre}`}
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {menuAbierto === principio.id && (
                        <div className="knowledge-principio-menu">
                          <button
                            type="button"
                            onClick={() =>
                              abrirEditarPrincipio(
                                principio
                              )
                            }
                          >
                            <Pencil size={16} />

                            Editar principio
                          </button>

                          <button
                            type="button"
                            className="knowledge-principio-menu-delete"
                            onClick={() =>
                              eliminarPrincipio(
                                principio
                              )
                            }
                          >
                            <Trash2 size={16} />

                            Eliminar principio
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p>{principio.descripcion}</p>

                  <div className="knowledge-principio-meta">
                    <span>
                      Categoría

                      <strong>
                        {principio.categoria}
                      </strong>
                    </span>

                    <span>
                      Alcance

                      <strong>
                        {principio.alcance}
                      </strong>
                    </span>

                    <span
                      className={`knowledge-principio-status knowledge-principio-status--${principio.estado.toLowerCase()}`}
                    >
                      {principio.estado}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="knowledge-principios-empty">
            <Scale size={24} />

            <strong>
              No se encontraron principios
            </strong>

            <span>
              Ajuste la búsqueda o cambie el filtro
              seleccionado.
            </span>
          </div>
        )}
      </div>

      {modalAbierto && (
        <NuevoPrincipioModal
          key={
            principioEditar
              ? principioEditar.id
              : "nuevo-principio"
          }
          onCerrar={cerrarModal}
          onGuardar={guardarPrincipio}
          principioEditar={principioEditar}
        />
      )}
    </section>
  );
}