import {
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Plus,
  Settings2,
  Trash2,
} from "lucide-react";

import {
  FIELD_TYPES,
} from "../../constants/fieldEngineConstants";

export default function FormBuilderCanvas({
  template,
  selectedFieldId,
  onSelectField,
  onAddSection,
  onAddField,
  onDeleteField,
  onDuplicateField,
  onMoveField,
}) {
  const getFieldType = (typeId) =>
    FIELD_TYPES.find((fieldType) => fieldType.id === typeId);

  return (
    <main className="fe-panel fe-builder">
      <div className="fe-panel__heading fe-panel__heading--builder">
        <div>
          <h2>Diseñador de campos</h2>
          <p>
            Construye la estructura que consumirán los módulos de GANUS.
          </p>
        </div>

        <button
          type="button"
          className="fe-button fe-button--secondary"
          onClick={onAddSection}
        >
          <Plus size={17} />
          <span>Nueva sección</span>
        </button>
      </div>

      <div className="fe-builder__canvas">
        {template.sections.map((section) => (
          <section className="fe-section" key={section.id}>
            <div className="fe-section__header">
              <div>
                <h3>{section.name}</h3>

                <span>
                  {section.fields.length}{" "}
                  {section.fields.length === 1 ? "campo" : "campos"}
                </span>
              </div>

              <Settings2 size={17} />
            </div>

            <div className="fe-section__fields">
              {section.fields.length === 0 ? (
                <button
                  type="button"
                  className="fe-empty-section"
                  onClick={() => onAddField("short-text", section.id)}
                >
                  <Plus size={19} />
                  <span>Agregar el primer campo</span>
                </button>
              ) : (
                section.fields.map((field, fieldIndex) => {
                  const fieldType = getFieldType(field.type);
                  const Icon = fieldType?.icon;

                  return (
                    <article
                      className={`fe-builder-field ${
                        selectedFieldId === field.id
                          ? "fe-builder-field--selected"
                          : ""
                      }`}
                      key={field.id}
                      onClick={() =>
                        onSelectField(field.id, section.id)
                      }
                    >
                      <div className="fe-builder-field__drag">
                        <GripVertical size={18} />
                      </div>

                      <div className="fe-builder-field__type">
                        {Icon && <Icon size={18} />}
                      </div>

                      <div className="fe-builder-field__content">
                        <div className="fe-builder-field__name">
                          <strong>{field.name}</strong>

                          {field.required && (
                            <span className="fe-required-label">
                              Obligatorio
                            </span>
                          )}
                        </div>

                        <span>
                          {fieldType?.name || field.type}
                          {" · "}
                          {field.captureMethods?.length || 0} métodos de captura
                        </span>
                      </div>

                      <div className="fe-builder-field__actions">
                        <button
                          type="button"
                          disabled={fieldIndex === 0}
                          onClick={(event) => {
                            event.stopPropagation();
                            onMoveField(section.id, field.id, "up");
                          }}
                          aria-label="Mover campo arriba"
                          title="Mover arriba"
                        >
                          <ChevronUp size={16} />
                        </button>

                        <button
                          type="button"
                          disabled={
                            fieldIndex === section.fields.length - 1
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            onMoveField(section.id, field.id, "down");
                          }}
                          aria-label="Mover campo abajo"
                          title="Mover abajo"
                        >
                          <ChevronDown size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onDuplicateField(section.id, field.id);
                          }}
                          aria-label="Duplicar campo"
                          title="Duplicar campo"
                        >
                          <Copy size={16} />
                        </button>

                        <button
                          type="button"
                          className="fe-builder-field__delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            onDeleteField(section.id, field.id);
                          }}
                          aria-label="Eliminar campo"
                          title="Eliminar campo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <button
              type="button"
              className="fe-add-field-button"
              onClick={() => onAddField("short-text", section.id)}
            >
              <Plus size={17} />
              <span>Agregar campo</span>
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}