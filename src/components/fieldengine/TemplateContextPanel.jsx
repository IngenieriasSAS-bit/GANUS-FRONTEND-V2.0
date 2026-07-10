import {
  Boxes,
  FileStack,
  Workflow,
} from "lucide-react";

import {
  CONSUMER_MODULES,
  TEMPLATE_CONTEXTS,
} from "../../constants/fieldEngineConstants";

export default function TemplateContextPanel({
  template,
  assetTypes,
  activityTypes,
  onChange,
}) {
  const getContextOptions = () => {
    if (template.contextType === "asset-type") {
      return assetTypes;
    }

    if (template.contextType === "activity-type") {
      return activityTypes;
    }

    return [
      { id: "process-general", name: "Proceso general" },
      { id: "process-control", name: "Control operativo" },
      { id: "process-inspection", name: "Inspección" },
    ];
  };

  return (
    <section className="fe-panel fe-context-panel">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <Workflow size={19} />
        </div>

        <div>
          <h2>Contexto de la plantilla</h2>
          <p>Define dónde y para qué será utilizada esta estructura.</p>
        </div>
      </div>

      <div className="fe-context-grid">
        <label className="fe-form-field">
          <span>Módulo consumidor</span>

          <select
            value={template.consumerModule}
            onChange={(event) =>
              onChange("consumerModule", event.target.value)
            }
          >
            {CONSUMER_MODULES.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>
        </label>

        <label className="fe-form-field">
          <span>Contexto funcional</span>

          <select
            value={template.contextType}
            onChange={(event) => {
              onChange("contextType", event.target.value);
              onChange("contextValue", "");
            }}
          >
            {TEMPLATE_CONTEXTS.map((context) => (
              <option key={context.id} value={context.id}>
                {context.name}
              </option>
            ))}
          </select>
        </label>

        <label className="fe-form-field">
          <span>Elemento de contexto</span>

          <select
            value={template.contextValue}
            onChange={(event) =>
              onChange("contextValue", event.target.value)
            }
          >
            <option value="">Seleccionar contexto</option>

            {getContextOptions().map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <label className="fe-form-field fe-form-field--wide">
          <span>Nombre de la plantilla</span>

          <div className="fe-input-with-icon">
            <FileStack size={17} />

            <input
              type="text"
              value={template.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Nombre de la plantilla"
            />
          </div>
        </label>

        <label className="fe-form-field fe-form-field--wide">
          <span>Descripción</span>

          <div className="fe-input-with-icon fe-input-with-icon--textarea">
            <Boxes size={17} />

            <textarea
              value={template.description}
              onChange={(event) =>
                onChange("description", event.target.value)
              }
              placeholder="Describe el propósito y uso de esta plantilla"
              rows="3"
            />
          </div>
        </label>
      </div>
    </section>
  );
}