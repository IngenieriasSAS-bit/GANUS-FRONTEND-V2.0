import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Save,
} from "lucide-react";

import DynamicFieldRenderer from "./DynamicFieldRenderer";

import "../../styles/fieldengine/dynamicFormRenderer.css";

const getInitialValues = (template) => {
  const initialValues = {};

  template.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (!field.visible) {
        return;
      }

      if (field.type === "boolean") {
        initialValues[field.key] =
          field.defaultValue === true ||
          field.defaultValue === "true";

        return;
      }

      if (field.type === "multiselect") {
        initialValues[field.key] = Array.isArray(
          field.defaultValue
        )
          ? field.defaultValue
          : [];

        return;
      }

      if (
        ["separator", "title", "note"].includes(field.type)
      ) {
        return;
      }

      initialValues[field.key] = field.defaultValue ?? "";
    });
  });

  return initialValues;
};

const isEmptyValue = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

export default function DynamicFormRenderer({
  template,
  catalogs,
  onSubmit,
}) {
  const initialValues = useMemo(
    () => getInitialValues(template),
    [template]
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const visibleSections = useMemo(
    () =>
      template.sections
        .map((section) => ({
          ...section,
          fields: section.fields.filter(
            (field) => field.visible !== false
          ),
        }))
        .filter((section) => section.fields.length > 0),
    [template]
  );

  const handleFieldChange = (fieldKey, nextValue) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldKey]: nextValue,
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

    setSubmitted(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    visibleSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (
          ["separator", "title", "note"].includes(field.type)
        ) {
          return;
        }

        if (
          field.required &&
          isEmptyValue(values[field.key])
        ) {
          nextErrors[field.key] =
            "Este campo es obligatorio.";
        }
      });
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setSubmitted(false);
      return;
    }

        onSubmit?.(structuredClone(values));

    setSubmitted(true);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <form
      className="dynamic-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {submitted && (
        <div className="dynamic-form__success">
          <CheckCircle2 size={20} />

          <div>
            <strong>Información validada</strong>

            <p>
              El formulario fue procesado correctamente por
              Field Engine.
            </p>
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="dynamic-form__validation">
          <AlertCircle size={20} />

          <div>
            <strong>Revisa la información ingresada</strong>

            <p>
              Completa los campos obligatorios antes de
              continuar.
            </p>
          </div>
        </div>
      )}

      <div className="dynamic-form__sections">
        {visibleSections.map((section, sectionIndex) => (
          <section
            className="dynamic-form__section"
            key={section.id}
          >
            <header className="dynamic-form__section-header">
              <div className="dynamic-form__section-index">
                {String(sectionIndex + 1).padStart(2, "0")}
              </div>

              <div>
                <h2>{section.name}</h2>

                {section.description && (
                  <p>{section.description}</p>
                )}
              </div>
            </header>

            <div className="dynamic-form__fields">
              {section.fields.map((field) => (
                <DynamicFieldRenderer
                  key={field.id}
                  field={field}
                  value={values[field.key]}
                  error={errors[field.key]}
                  catalogs={catalogs}
                  onChange={handleFieldChange}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="dynamic-form__footer">
        <div className="dynamic-form__footer-info">
          <ClipboardCheck size={18} />

          <span>
            Formulario generado desde la versión{" "}
            {template.version} de la plantilla.
          </span>
        </div>

        <div className="dynamic-form__actions">
          <button
            type="button"
            className="dynamic-form__reset"
            onClick={handleReset}
          >
            Restablecer
          </button>

          <button
            type="submit"
            className="dynamic-form__submit"
          >
            <Save size={18} />

            <span>Guardar registro</span>
          </button>
        </div>
      </footer>
    </form>
  );
}