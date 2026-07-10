import {
  Search,
  Shapes,
} from "lucide-react";

import { useMemo, useState } from "react";

import { FIELD_TYPES } from "../../constants/fieldEngineConstants";

export default function FieldTypePalette({ onAddField }) {
  const [search, setSearch] = useState("");

  const filteredTypes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return FIELD_TYPES;
    }

    return FIELD_TYPES.filter((fieldType) =>
      fieldType.name.toLowerCase().includes(normalizedSearch)
    );
  }, [search]);

  return (
    <aside className="fe-panel fe-field-palette">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <Shapes size={19} />
        </div>

        <div>
          <h2>Tipos de campo</h2>
          <p>Selecciona un tipo para agregarlo al formulario.</p>
        </div>
      </div>

      <div className="fe-search">
        <Search size={16} />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar campo"
        />
      </div>

      <div className="fe-field-palette__list">
        {filteredTypes.map((fieldType) => {
          const Icon = fieldType.icon;

          return (
            <button
              type="button"
              className="fe-field-type"
              key={fieldType.id}
              onClick={() => onAddField(fieldType.id)}
            >
              <span className="fe-field-type__icon">
                <Icon size={17} />
              </span>

              <span>{fieldType.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}