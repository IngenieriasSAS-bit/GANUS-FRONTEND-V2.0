import {
  CalendarDays,
  Camera,
  CheckSquare,
  FileText,
  Hash,
  Image,
  ListChecks,
  MapPin,
  Minus,
  PenLine,
  QrCode,
  Save,
  Type,
  Upload,
  Video,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

const FIELD_ICONS = {
  "short-text": Type,
  "long-text": FileText,
  number: Hash,
  decimal: Hash,
  date: CalendarDays,
  datetime: CalendarDays,
  boolean: CheckSquare,
  list: ListChecks,
  multiselect: ListChecks,
  image: Image,
  video: Video,
  signature: PenLine,
  gps: MapPin,
  qr: QrCode,
  separator: Minus,
  title: Type,
  note: FileText,
};

export default function DynamicFormPreview({
  template,
  catalogs,
  onClose,
}) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const catalogMap = useMemo(
    () =>
      Object.fromEntries(
        catalogs.map((catalog) => [
          catalog.id,
          catalog,
        ])
      ),
    [catalogs]
  );

  const updateValue = (fieldKey, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldKey]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[fieldKey]) {
        return currentErrors;
      }

      const nextErrors = {
        ...currentErrors,
      };

      delete nextErrors[fieldKey];

      return nextErrors;
    });
  };

  const validateField = (field, value) => {
    if (
      field.required &&
      (
        value === undefined ||
        value === null ||
        value === "" ||
        (
          Array.isArray(value) &&
          value.length === 0
        )
      )
    ) {
      return "Este campo es obligatorio.";
    }

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return null;
    }

    for (const validation of field.validations || []) {
      const customMessage =
        validation.message ||
        "El valor ingresado no cumple la validación.";

      if (
        validation.type === "min" &&
        Number(value) < Number(validation.value)
      ) {
        return customMessage;
      }

      if (
        validation.type === "max" &&
        Number(value) > Number(validation.value)
      ) {
        return customMessage;
      }

      if (
        validation.type === "minLength" &&
        String(value).length <
          Number(validation.value)
      ) {
        return customMessage;
      }

      if (
        validation.type === "maxLength" &&
        String(value).length >
          Number(validation.value)
      ) {
        return customMessage;
      }

      if (
        validation.type === "expression" &&
        validation.value
      ) {
        try {
          const expression = new RegExp(
            validation.value
          );

          if (!expression.test(String(value))) {
            return customMessage;
          }
        } catch {
          return "La expresión configurada no es válida.";
        }
      }
    }

    return null;
  };

  const validateForm = () => {
    const nextErrors = {};

    template.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const error = validateField(
          field,
          formValues[field.key]
        );

        if (error) {
          nextErrors[field.key] = error;
        }
      });
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    window.alert(
      "Vista previa validada correctamente. En este modo no se almacenan registros."
    );
  };

  const toggleMultiValue = (
    fieldKey,
    option
  ) => {
    const currentValues =
      formValues[fieldKey] || [];

    const nextValues = currentValues.includes(option)
      ? currentValues.filter(
          (value) => value !== option
        )
      : [...currentValues, option];

    updateValue(fieldKey, nextValues);
  };

  const renderField = (field) => {
    const value =
      formValues[field.key] ??
      field.defaultValue ??
      "";

    const catalog =
      catalogMap[field.catalogId];

    const options = catalog?.values || [];

    switch (field.type) {
      case "long-text":
        return (
          <textarea
            rows="4"
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          />
        );

      case "number":
      case "decimal":
        return (
          <input
            type="number"
            step={
              field.type === "decimal"
                ? "any"
                : "1"
            }
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          />
        );

      case "datetime":
        return (
          <input
            type="datetime-local"
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          />
        );

      case "boolean":
        return (
          <label className="fe-preview-checkbox">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) =>
                updateValue(
                  field.key,
                  event.target.checked
                )
              }
            />

            <span>
              Marcar si corresponde
            </span>
          </label>
        );

      case "list":
        return (
          <select
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          >
            <option value="">
              Seleccionar opción
            </option>

            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        return (
          <div className="fe-preview-options">
            {options.length === 0 ? (
              <span className="fe-preview-no-options">
                El campo no tiene un catálogo configurado.
              </span>
            ) : (
              options.map((option) => {
                const selectedValues =
                  Array.isArray(value)
                    ? value
                    : [];

                const isSelected =
                  selectedValues.includes(option);

                return (
                  <button
                    type="button"
                    key={option}
                    className={
                      isSelected
                        ? "fe-preview-option fe-preview-option--selected"
                        : "fe-preview-option"
                    }
                    onClick={() =>
                      toggleMultiValue(
                        field.key,
                        option
                      )
                    }
                  >
                    {option}
                  </button>
                );
              })
            )}
          </div>
        );

      case "image":
        return (
          <label className="fe-preview-capture">
            <Camera size={21} />

            <span>Seleccionar imagen</span>

            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                updateValue(
                  field.key,
                  event.target.files?.[0]?.name || ""
                )
              }
            />
          </label>
        );

      case "video":
        return (
          <label className="fe-preview-capture">
            <Video size={21} />

            <span>Seleccionar video</span>

            <input
              type="file"
              accept="video/*"
              onChange={(event) =>
                updateValue(
                  field.key,
                  event.target.files?.[0]?.name || ""
                )
              }
            />
          </label>
        );

      case "signature":
        return (
          <div className="fe-preview-placeholder">
            <PenLine size={22} />

            <span>
              Área de firma digital
            </span>
          </div>
        );

      case "gps":
        return (
          <div className="fe-preview-inline-field">
            <input
              type="text"
              value={value}
              onChange={(event) =>
                updateValue(
                  field.key,
                  event.target.value
                )
              }
              placeholder="Latitud, longitud"
            />

            <button
              type="button"
              title="Capturar ubicación"
            >
              <MapPin size={17} />
            </button>
          </div>
        );

      case "qr":
        return (
          <div className="fe-preview-inline-field">
            <input
              type="text"
              value={value}
              onChange={(event) =>
                updateValue(
                  field.key,
                  event.target.value
                )
              }
              placeholder="Código QR"
            />

            <button
              type="button"
              title="Escanear código QR"
            >
              <QrCode size={17} />
            </button>
          </div>
        );

      case "separator":
        return (
          <div className="fe-preview-separator" />
        );

      case "title":
        return (
          <h4 className="fe-preview-custom-title">
            {field.defaultValue ||
              field.name}
          </h4>
        );

      case "note":
        return (
          <div className="fe-preview-note">
            <FileText size={17} />

            <p>
              {field.defaultValue ||
                field.helpText ||
                field.name}
            </p>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value
              )
            }
          />
        );
    }
  };

  return (
    <div
      className="fe-preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa del formulario"
    >
      <div className="fe-preview-modal">
        <header className="fe-preview-header">
          <div>
            <span>Vista previa dinámica</span>

            <h2>{template.name}</h2>

            <p>
              Versión {template.version} ·{" "}
              {template.description ||
                "Formulario generado desde Field Engine"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista previa"
            title="Cerrar"
          >
            <X size={20} />
          </button>
        </header>

        <div className="fe-preview-banner">
          <Upload size={18} />

          <p>
            Esta interfaz se generó automáticamente
            desde la estructura actual de la plantilla.
            La vista previa no almacena registros.
          </p>
        </div>

        <form
          className="fe-preview-form"
          onSubmit={handleSubmit}
        >
          {template.sections.map((section) => (
            <section
              className="fe-preview-section"
              key={section.id}
            >
              <div className="fe-preview-section__header">
                <h3>{section.name}</h3>

                <span>
                  {section.fields.length}{" "}
                  {section.fields.length === 1
                    ? "campo"
                    : "campos"}
                </span>
              </div>

              <div className="fe-preview-section__fields">
                {section.fields.map((field) => {
                  const Icon =
                    FIELD_ICONS[field.type] ||
                    Type;

                  const isStructural = [
                    "separator",
                    "title",
                    "note",
                  ].includes(field.type);

                  return (
                    <div
                      className={
                        isStructural
                          ? "fe-preview-field fe-preview-field--wide"
                          : "fe-preview-field"
                      }
                      key={field.id}
                    >
                      {!isStructural && (
                        <label className="fe-preview-field__label">
                          <span>
                            <Icon size={15} />

                            {field.name}

                            {field.required && (
                              <strong>*</strong>
                            )}
                          </span>

                          {field.helpText && (
                            <small>
                              {field.helpText}
                            </small>
                          )}
                        </label>
                      )}

                      {renderField(field)}

                      {errors[field.key] && (
                        <span className="fe-preview-error">
                          {errors[field.key]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <footer className="fe-preview-footer">
            <button
              type="button"
              className="fe-button fe-button--secondary"
              onClick={onClose}
            >
              <X size={17} />
              <span>Cerrar</span>
            </button>

            <button
              type="submit"
              className="fe-button fe-button--primary"
            >
              <Save size={17} />
              <span>Validar formulario</span>
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}