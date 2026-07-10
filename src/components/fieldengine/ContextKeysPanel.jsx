import {
  Check,
  Fingerprint,
} from "lucide-react";

import {
  CONTEXT_KEYS,
} from "../../constants/fieldEngineConstants";

export default function ContextKeysPanel({
  template,
  onChange,
}) {
  const selectedKeys = template.contextKeys || [];

  const toggleContextKey = (keyId) => {
    const nextKeys = selectedKeys.includes(keyId)
      ? selectedKeys.filter((id) => id !== keyId)
      : [...selectedKeys, keyId];

    onChange("contextKeys", nextKeys);
  };

  return (
    <section className="fe-panel fe-config-card">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <Fingerprint size={19} />
        </div>

        <div>
          <h2>Claves de contexto</h2>
          <p>
            Define la trazabilidad mínima automática de cada registro.
          </p>
        </div>
      </div>

      <div className="fe-context-keys">
        {CONTEXT_KEYS.map((contextKey) => {
          const isSelected = selectedKeys.includes(
            contextKey.id
          );

          return (
            <button
              type="button"
              key={contextKey.id}
              className={`fe-context-key ${
                isSelected
                  ? "fe-context-key--selected"
                  : ""
              }`}
              onClick={() =>
                toggleContextKey(contextKey.id)
              }
            >
              <span className="fe-context-key__check">
                {isSelected && <Check size={15} />}
              </span>

              <span className="fe-context-key__content">
                <strong>{contextKey.name}</strong>
                <small>
                  {contextKey.description}
                </small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}