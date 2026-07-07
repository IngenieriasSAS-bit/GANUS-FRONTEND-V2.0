import { useState } from "react";

import {
  X,
  ChartNoAxesCombined,
  Save,
} from "lucide-react";

import "../../styles/knowledge/nuevoIndicadorModal.css";

const formularioInicial = {
  nombre: "",
  objetivo: "",
  unidad: "%",
  frecuencia: "Mensual",
  valor: "",
  estado: "Borrador",
};

export default function NuevoIndicadorModal({
  onCerrar,
  onGuardar,
  indicadorEditar = null,
}) {
  const [formulario, setFormulario] = useState(() =>
    indicadorEditar
      ? {
          nombre: indicadorEditar.nombre,
          objetivo: indicadorEditar.objetivo,
          unidad: indicadorEditar.unidad,
          frecuencia: indicadorEditar.frecuencia,
          valor: indicadorEditar.valor,
          estado: indicadorEditar.estado,
        }
      : formularioInicial
  );

  const [errores, setErrores] = useState({});

  const esEdicion = Boolean(indicadorEditar);

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
        "El nombre del indicador es obligatorio.";
    }

    if (!formulario.objetivo.trim()) {
      nuevosErrores.objetivo =
        "El objetivo estratégico es obligatorio.";
    }

    if (!formulario.valor.trim()) {
      nuevosErrores.valor =
        "El valor actual es obligatorio.";
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
      ...(indicadorEditar && {
        id: indicadorEditar.id,
      }),
      nombre: formulario.nombre.trim(),
      objetivo: formulario.objetivo.trim(),
      unidad: formulario.unidad,
      frecuencia: formulario.frecuencia,
      valor: formulario.valor.trim(),
      estado: formulario.estado,
    });
  };

  return (
    <div className="knowledge-indicador-modal-overlay">
      <section
        className="knowledge-indicador-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="indicador-modal-title"
      >
        <div className="knowledge-indicador-modal-header">
          <div className="knowledge-indicador-modal-heading">
            <div className="knowledge-indicador-modal-icon">
              <ChartNoAxesCombined size={21} />
            </div>

            <div>
              <h2 id="indicador-modal-title">
                {esEdicion
                  ? "Editar indicador"
                  : "Nuevo indicador"}
              </h2>

              <p>
                {esEdicion
                  ? "Actualice la definición de medición registrada en Knowledge Studio."
                  : "Registre una nueva medición asociada al modelo estratégico de GANUS."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="knowledge-indicador-modal-close"
            onClick={onCerrar}
            aria-label="Cerrar formulario"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="knowledge-indicador-form"
          onSubmit={manejarEnvio}
        >
          <div className="knowledge-indicador-form-group knowledge-indicador-form-group--full">
            <label htmlFor="indicador-nombre">
              Nombre del indicador
            </label>

            <input
              id="indicador-nombre"
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Disponibilidad operacional"
            />

            {errores.nombre && (
              <small className="knowledge-indicador-form-error">
                {errores.nombre}
              </small>
            )}
          </div>

          <div className="knowledge-indicador-form-group knowledge-indicador-form-group--full">
            <label htmlFor="indicador-objetivo">
              Objetivo estratégico
            </label>

            <input
              id="indicador-objetivo"
              type="text"
              name="objetivo"
              value={formulario.objetivo}
              onChange={manejarCambio}
              placeholder="Ej. Fortalecer la eficiencia operativa"
            />

            {errores.objetivo && (
              <small className="knowledge-indicador-form-error">
                {errores.objetivo}
              </small>
            )}
          </div>

          <div className="knowledge-indicador-form-grid">
            <div className="knowledge-indicador-form-group">
              <label htmlFor="indicador-unidad">
                Unidad
              </label>

              <select
                id="indicador-unidad"
                name="unidad"
                value={formulario.unidad}
                onChange={manejarCambio}
              >
                <option value="%">Porcentaje (%)</option>
                <option value="Cantidad">Cantidad</option>
                <option value="Horas">Horas</option>
                <option value="Días">Días</option>
              </select>
            </div>

            <div className="knowledge-indicador-form-group">
              <label htmlFor="indicador-frecuencia">
                Frecuencia
              </label>

              <select
                id="indicador-frecuencia"
                name="frecuencia"
                value={formulario.frecuencia}
                onChange={manejarCambio}
              >
                <option value="Diaria">Diaria</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">
                  Trimestral
                </option>
              </select>
            </div>

            <div className="knowledge-indicador-form-group">
              <label htmlFor="indicador-valor">
                Valor actual
              </label>

              <input
                id="indicador-valor"
                type="text"
                name="valor"
                value={formulario.valor}
                onChange={manejarCambio}
                placeholder="Ej. 98.4%"
              />

              {errores.valor && (
                <small className="knowledge-indicador-form-error">
                  {errores.valor}
                </small>
              )}
            </div>

            <div className="knowledge-indicador-form-group">
              <label htmlFor="indicador-estado">
                Estado
              </label>

              <select
                id="indicador-estado"
                name="estado"
                value={formulario.estado}
                onChange={manejarCambio}
              >
                <option value="Publicado">
                  Publicado
                </option>

                <option value="Borrador">
                  Borrador
                </option>
              </select>
            </div>
          </div>

          <div className="knowledge-indicador-form-actions">
            <button
              type="button"
              className="knowledge-indicador-form-cancel"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="knowledge-indicador-form-save"
            >
              <Save size={17} />

              {esEdicion
                ? "Guardar cambios"
                : "Guardar indicador"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}