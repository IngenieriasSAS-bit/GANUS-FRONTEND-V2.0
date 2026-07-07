import { useState } from "react";

import {
  X,
  Target,
  Save,
} from "lucide-react";

import "../../styles/knowledge/nuevoObjetivoModal.css";

const formularioInicial = {
  nombre: "",
  descripcion: "",
  progreso: 0,
  indicadores: 0,
  estado: "Activo",
};

export default function NuevoObjetivoModal({
  onCerrar,
  onGuardar,
  objetivoEditar = null,
}) {
  const [formulario, setFormulario] = useState(() =>
    objetivoEditar
      ? {
          nombre: objetivoEditar.nombre,
          descripcion: objetivoEditar.descripcion,
          progreso: objetivoEditar.progreso,
          indicadores: objetivoEditar.indicadores,
          estado: objetivoEditar.estado,
        }
      : formularioInicial
  );

  const [errores, setErrores] = useState({});

  const esEdicion = Boolean(objetivoEditar);

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));

    setErrores((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: "",
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre =
        "El nombre del objetivo es obligatorio.";
    }

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion =
        "La descripción del objetivo es obligatoria.";
    }

    if (
      Number(formulario.progreso) < 0 ||
      Number(formulario.progreso) > 100
    ) {
      nuevosErrores.progreso =
        "El avance debe estar entre 0 y 100.";
    }

    if (Number(formulario.indicadores) < 0) {
      nuevosErrores.indicadores =
        "La cantidad de indicadores no puede ser negativa.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    onGuardar({
      ...(objetivoEditar && {
        id: objetivoEditar.id,
      }),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      progreso: Number(formulario.progreso),
      indicadores: Number(formulario.indicadores),
      estado: formulario.estado,
    });
  };

  return (
    <div
      className="knowledge-objective-modal-overlay"
      role="presentation"
    >
      <section
        className="knowledge-objective-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="objetivo-modal-title"
      >
        <div className="knowledge-objective-modal-header">
          <div className="knowledge-objective-modal-heading">
            <div className="knowledge-objective-modal-icon">
              <Target size={21} />
            </div>

            <div>
              <h2 id="objetivo-modal-title">
                {esEdicion
                  ? "Editar objetivo estratégico"
                  : "Nuevo objetivo estratégico"}
              </h2>

              <p>
                {esEdicion
                  ? "Actualice la información estratégica registrada en el modelo de conocimiento."
                  : "Registre un resultado estratégico dentro del modelo de conocimiento empresarial."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-objective-modal-close"
            onClick={onCerrar}
            aria-label="Cerrar formulario"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="knowledge-objective-form"
          onSubmit={manejarEnvio}
        >
          <div className="knowledge-objective-form-group knowledge-objective-form-group--full">
            <label htmlFor="objetivo-nombre">
              Nombre del objetivo
            </label>

            <input
              id="objetivo-nombre"
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Mejorar la disponibilidad operacional"
            />

            {errores.nombre && (
              <small className="knowledge-objective-form-error">
                {errores.nombre}
              </small>
            )}
          </div>

          <div className="knowledge-objective-form-group knowledge-objective-form-group--full">
            <label htmlFor="objetivo-descripcion">
              Descripción
            </label>

            <textarea
              id="objetivo-descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Describa el resultado estratégico que se espera alcanzar."
              rows={4}
            />

            {errores.descripcion && (
              <small className="knowledge-objective-form-error">
                {errores.descripcion}
              </small>
            )}
          </div>

          <div className="knowledge-objective-form-grid">
            <div className="knowledge-objective-form-group">
              <label htmlFor="objetivo-progreso">
                Avance (%)
              </label>

              <input
                id="objetivo-progreso"
                type="number"
                name="progreso"
                min="0"
                max="100"
                value={formulario.progreso}
                onChange={manejarCambio}
              />

              {errores.progreso && (
                <small className="knowledge-objective-form-error">
                  {errores.progreso}
                </small>
              )}
            </div>

            <div className="knowledge-objective-form-group">
              <label htmlFor="objetivo-indicadores">
                Indicadores asociados
              </label>

              <input
                id="objetivo-indicadores"
                type="number"
                name="indicadores"
                min="0"
                value={formulario.indicadores}
                onChange={manejarCambio}
              />

              {errores.indicadores && (
                <small className="knowledge-objective-form-error">
                  {errores.indicadores}
                </small>
              )}
            </div>

            <div className="knowledge-objective-form-group">
              <label htmlFor="objetivo-estado">
                Estado
              </label>

              <select
                id="objetivo-estado"
                name="estado"
                value={formulario.estado}
                onChange={manejarCambio}
              >
                <option value="Activo">
                  Activo
                </option>

                <option value="En revisión">
                  En revisión
                </option>
              </select>
            </div>
          </div>

          <div className="knowledge-objective-form-actions">
            <button
              type="button"
              className="knowledge-objective-form-cancel"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="knowledge-objective-form-save"
            >
              <Save size={17} />

              {esEdicion
                ? "Guardar cambios"
                : "Guardar objetivo"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}