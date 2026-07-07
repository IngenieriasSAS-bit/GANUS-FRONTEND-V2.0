import { useState } from "react";

import {
  Scale,
  X,
  Save,
} from "lucide-react";

import "../../styles/knowledge/nuevoPrincipioModal.css";

const datosIniciales = {
  nombre: "",
  descripcion: "",
  categoria: "Gobernanza",
  alcance: "Corporativo",
  estado: "Vigente",
};

export default function NuevoPrincipioModal({
  onCerrar,
  onGuardar,
  principioEditar = null,
}) {
  const [formulario, setFormulario] = useState(() =>
    principioEditar
      ? {
          nombre: principioEditar.nombre,
          descripcion: principioEditar.descripcion,
          categoria: principioEditar.categoria,
          alcance: principioEditar.alcance,
          estado: principioEditar.estado,
        }
      : datosIniciales
  );

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: value,
    }));
  };

  const manejarSubmit = (event) => {
    event.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.descripcion.trim()
    ) {
      return;
    }

    onGuardar({
      ...formulario,
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
    });
  };

  const esEdicion = Boolean(principioEditar);

  return (
    <div className="nuevo-principio-overlay">
      <div
        className="nuevo-principio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nuevo-principio-title"
      >
        <div className="nuevo-principio-header">
          <div className="nuevo-principio-heading">
            <div className="nuevo-principio-icon">
              <Scale size={21} />
            </div>

            <div>
              <h2 id="nuevo-principio-title">
                {esEdicion
                  ? "Editar principio de negocio"
                  : "Nuevo principio de negocio"}
              </h2>

              <p>
                {esEdicion
                  ? "Actualice el criterio empresarial registrado en el modelo de conocimiento."
                  : "Registre un nuevo criterio empresarial dentro del modelo de conocimiento de GANUS."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="nuevo-principio-close"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            <X size={19} />
          </button>
        </div>

        <form
          className="nuevo-principio-form"
          onSubmit={manejarSubmit}
        >
          <label>
            <span>Nombre del principio</span>

            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Integridad de la información"
              required
            />
          </label>

          <label>
            <span>Descripción</span>

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Describa el criterio empresarial que debe orientar las decisiones."
              rows={4}
              required
            />
          </label>

          <div className="nuevo-principio-grid">
            <label>
              <span>Categoría</span>

              <select
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
              >
                <option value="Gobernanza">
                  Gobernanza
                </option>

                <option value="Operación">
                  Operación
                </option>

                <option value="Estrategia">
                  Estrategia
                </option>

                <option value="Riesgo">
                  Riesgo
                </option>

                <option value="Conocimiento">
                  Conocimiento
                </option>
              </select>
            </label>

            <label>
              <span>Alcance</span>

              <select
                name="alcance"
                value={formulario.alcance}
                onChange={manejarCambio}
              >
                <option value="Corporativo">
                  Corporativo
                </option>

                <option value="Operación">
                  Operación
                </option>

                <option value="Activos">
                  Activos
                </option>

                <option value="Knowledge Studio">
                  Knowledge Studio
                </option>
              </select>
            </label>

            <label>
              <span>Estado</span>

              <select
                name="estado"
                value={formulario.estado}
                onChange={manejarCambio}
              >
                <option value="Vigente">
                  Vigente
                </option>

                <option value="Borrador">
                  Borrador
                </option>
              </select>
            </label>
          </div>

          <div className="nuevo-principio-footer">
            <button
              type="button"
              className="nuevo-principio-cancel"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="nuevo-principio-save"
            >
              <Save size={17} />

              {esEdicion
                ? "Guardar cambios"
                : "Guardar principio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}