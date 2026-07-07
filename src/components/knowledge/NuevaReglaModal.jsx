import { useState } from "react";

import {
  GitBranch,
  X,
  Save,
} from "lucide-react";

import "../../styles/knowledge/nuevaReglaModal.css";

const datosIniciales = {
  nombre: "",
  descripcion: "",
  evento: "",
  condicion: "",
  accion: "",
  estado: "Activa",
};

export default function NuevaReglaModal({
  onCerrar,
  onGuardar,
  reglaEditar = null,
}) {
  const [formulario, setFormulario] = useState(() =>
    reglaEditar
      ? {
          nombre: reglaEditar.nombre,
          descripcion: reglaEditar.descripcion,
          evento: reglaEditar.evento,
          condicion: reglaEditar.condicion,
          accion: reglaEditar.accion,
          estado: reglaEditar.estado,
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
      !formulario.descripcion.trim() ||
      !formulario.evento.trim() ||
      !formulario.condicion.trim() ||
      !formulario.accion.trim()
    ) {
      return;
    }

    onGuardar({
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      evento: formulario.evento.trim(),
      condicion: formulario.condicion.trim(),
      accion: formulario.accion.trim(),
      estado: formulario.estado,
    });
  };

  const esEdicion = Boolean(reglaEditar);

  return (
    <div className="nueva-regla-overlay">
      <div
        className="nueva-regla-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nueva-regla-title"
      >
        <div className="nueva-regla-header">
          <div className="nueva-regla-heading">
            <div className="nueva-regla-icon">
              <GitBranch size={21} />
            </div>

            <div>
              <h2 id="nueva-regla-title">
                {esEdicion
                  ? "Editar regla"
                  : "Nueva regla"}
              </h2>

              <p>
                {esEdicion
                  ? "Actualice las condiciones de evaluación registradas en el motor de conocimiento."
                  : "Defina una nueva condición automatizada para el motor de conocimiento de GANUS."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="nueva-regla-close"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            <X size={19} />
          </button>
        </div>

        <form
          className="nueva-regla-form"
          onSubmit={manejarSubmit}
        >
          <label>
            <span>Nombre de la regla</span>

            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Evaluar disponibilidad crítica"
              required
            />
          </label>

          <label>
            <span>Descripción</span>

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Describa el propósito de la regla dentro del motor de conocimiento."
              rows={3}
              required
            />
          </label>

          <div className="nueva-regla-grid">
            <label>
              <span>Evento</span>

              <input
                type="text"
                name="evento"
                value={formulario.evento}
                onChange={manejarCambio}
                placeholder="Ej. Indicador actualizado"
                required
              />
            </label>

            <label>
              <span>Condición</span>

              <input
                type="text"
                name="condicion"
                value={formulario.condicion}
                onChange={manejarCambio}
                placeholder="Ej. Disponibilidad < 95%"
                required
              />
            </label>
          </div>

          <div className="nueva-regla-grid">
            <label>
              <span>Acción</span>

              <input
                type="text"
                name="accion"
                value={formulario.accion}
                onChange={manejarCambio}
                placeholder="Ej. Generar alerta crítica"
                required
              />
            </label>

            <label>
              <span>Estado</span>

              <select
                name="estado"
                value={formulario.estado}
                onChange={manejarCambio}
              >
                <option value="Activa">
                  Activa
                </option>

                <option value="Borrador">
                  Borrador
                </option>
              </select>
            </label>
          </div>

          <div className="nueva-regla-footer">
            <button
              type="button"
              className="nueva-regla-cancel"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="nueva-regla-save"
            >
              <Save size={17} />

              {esEdicion
                ? "Guardar cambios"
                : "Guardar regla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}