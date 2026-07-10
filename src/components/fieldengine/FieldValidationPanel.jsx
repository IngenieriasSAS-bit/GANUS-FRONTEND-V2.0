import {
  AlertCircle,
  Braces,
  Database,
  Link2,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { VALIDATION_TYPES } from "../../constants/fieldEngineConstants";

const VALUE_VALIDATIONS = [
  "min",
  "max",
  "minLength",
  "maxLength",
  "expression",
];

export default function FieldValidationPanel({
  selectedField,
  catalogs,
  onFieldChange,
}) {
  if (!selectedField) {
    return null;
  }

  const validations = selectedField.validations || [];

  const addValidation = () => {
    onFieldChange("validations", [
      ...validations,
      {
        id: crypto.randomUUID(),
        type: "min",
        value: "",
        message: "",
        sourceFieldKey: "",
        operator: "equals",
        expectedValue: "",
        action: "hide",
      },
    ]);
  };

  const updateValidation = (validationId, property, value) => {
    onFieldChange(
      "validations",
      validations.map((validation) =>
        validation.id === validationId
          ? {
              ...validation,
              [property]: value,
            }
          : validation
      )
    );
  };

  const deleteValidation = (validationId) => {
    onFieldChange(
      "validations",
      validations.filter(
        (validation) => validation.id !== validationId
      )
    );
  };

  const supportsCatalog = [
    "list",
    "multiselect",
  ].includes(selectedField.type);

  return (
    <section className="fe-panel fe-config-card">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <ShieldCheck size={19} />
        </div>

        <div>
          <h2>Catálogos y validaciones</h2>
          <p>
            Normaliza y controla la información antes del almacenamiento.
          </p>
        </div>
      </div>

      <div className="fe-config-card__content">
        {supportsCatalog && (
          <div className="fe-config-block">
            <div className="fe-config-block__heading">
              <div>
                <strong>Catálogo reutilizable</strong>
                <span>
                  Define los valores permitidos para este campo.
                </span>
              </div>

              <Database size={18} />
            </div>

            <label className="fe-form-field">
              <span>Catálogo asociado</span>

              <select
                value={selectedField.catalogId || ""}
                onChange={(event) =>
                  onFieldChange(
                    "catalogId",
                    event.target.value
                  )
                }
              >
                <option value="">
                  Sin catálogo asociado
                </option>

                {catalogs
                  .filter((catalog) => catalog.active)
                  .map((catalog) => (
                    <option
                      key={catalog.id}
                      value={catalog.id}
                    >
                      {catalog.name}
                    </option>
                  ))}
              </select>
            </label>

            {selectedField.catalogId && (
              <div className="fe-allowed-values">
                {catalogs
                  .find(
                    (catalog) =>
                      catalog.id ===
                      selectedField.catalogId
                  )
                  ?.values.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
              </div>
            )}
          </div>
        )}

        <div className="fe-config-block">
          <div className="fe-config-block__heading">
            <div>
              <strong>Reglas de validación</strong>
              <span>
                Configura rangos, expresiones y dependencias.
              </span>
            </div>

            <button
              type="button"
              className="fe-small-action"
              onClick={addValidation}
            >
              <Plus size={16} />
              <span>Agregar regla</span>
            </button>
          </div>

          {validations.length === 0 ? (
            <div className="fe-config-empty">
              <AlertCircle size={22} />

              <div>
                <strong>Sin reglas adicionales</strong>
                <p>
                  La obligatoriedad continúa configurándose
                  desde las propiedades del campo.
                </p>
              </div>
            </div>
          ) : (
            <div className="fe-validation-list">
              {validations.map((validation) => (
                <article
                  className="fe-validation-rule"
                  key={validation.id}
                >
                  <div className="fe-validation-rule__header">
                    <div>
                      {validation.type === "dependency" ? (
                        <Link2 size={17} />
                      ) : (
                        <Braces size={17} />
                      )}

                      <strong>Regla de validación</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteValidation(validation.id)
                      }
                      aria-label="Eliminar validación"
                      title="Eliminar validación"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="fe-validation-rule__grid">
                    <label className="fe-form-field">
                      <span>Tipo</span>

                      <select
                        value={validation.type}
                        onChange={(event) =>
                          updateValidation(
                            validation.id,
                            "type",
                            event.target.value
                          )
                        }
                      >
                        {VALIDATION_TYPES.filter(
                          (type) =>
                            type.id !== "required"
                        ).map((type) => (
                          <option
                            key={type.id}
                            value={type.id}
                          >
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    {VALUE_VALIDATIONS.includes(
                      validation.type
                    ) && (
                      <label className="fe-form-field">
                        <span>Valor o expresión</span>

                        <input
                          type="text"
                          value={validation.value}
                          onChange={(event) =>
                            updateValidation(
                              validation.id,
                              "value",
                              event.target.value
                            )
                          }
                          placeholder={
                            validation.type === "expression"
                              ? "Ej. ^[A-Z0-9-]+$"
                              : "Valor de validación"
                          }
                        />
                      </label>
                    )}

                    {[
                      "dependency",
                      "crossValidation",
                    ].includes(validation.type) && (
                      <>
                        <label className="fe-form-field">
                          <span>Clave del campo origen</span>

                          <input
                            type="text"
                            value={
                              validation.sourceFieldKey
                            }
                            onChange={(event) =>
                              updateValidation(
                                validation.id,
                                "sourceFieldKey",
                                event.target.value
                              )
                            }
                            placeholder="Ej. sexo"
                          />
                        </label>

                        <label className="fe-form-field">
                          <span>Condición</span>

                          <select
                            value={validation.operator}
                            onChange={(event) =>
                              updateValidation(
                                validation.id,
                                "operator",
                                event.target.value
                              )
                            }
                          >
                            <option value="equals">
                              Es igual a
                            </option>
                            <option value="notEquals">
                              Es diferente de
                            </option>
                            <option value="greaterThan">
                              Es mayor que
                            </option>
                            <option value="lessThan">
                              Es menor que
                            </option>
                          </select>
                        </label>

                        <label className="fe-form-field">
                          <span>Valor esperado</span>

                          <input
                            type="text"
                            value={
                              validation.expectedValue
                            }
                            onChange={(event) =>
                              updateValidation(
                                validation.id,
                                "expectedValue",
                                event.target.value
                              )
                            }
                            placeholder="Valor de comparación"
                          />
                        </label>

                        <label className="fe-form-field">
                          <span>Comportamiento</span>

                          <select
                            value={validation.action}
                            onChange={(event) =>
                              updateValidation(
                                validation.id,
                                "action",
                                event.target.value
                              )
                            }
                          >
                            <option value="hide">
                              Ocultar campo
                            </option>
                            <option value="show">
                              Mostrar campo
                            </option>
                            <option value="require">
                              Hacer obligatorio
                            </option>
                            <option value="block">
                              Bloquear captura
                            </option>
                          </select>
                        </label>
                      </>
                    )}

                    <label className="fe-form-field fe-form-field--rule-wide">
                      <span>Mensaje de validación</span>

                      <input
                        type="text"
                        value={validation.message}
                        onChange={(event) =>
                          updateValidation(
                            validation.id,
                            "message",
                            event.target.value
                          )
                        }
                        placeholder="Mensaje visible cuando la validación no se cumple"
                      />
                    </label>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}