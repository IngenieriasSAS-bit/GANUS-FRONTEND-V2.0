import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function ObjetivoAcciones({
  onEditar,
  onEliminar,
}) {
  return (
    <div className="knowledge-objective-actions-menu">
      <button
        type="button"
        onClick={onEditar}
      >
        <Pencil size={16} />

        Editar objetivo
      </button>

      <button
        type="button"
        className="knowledge-objective-actions-delete"
        onClick={onEliminar}
      >
        <Trash2 size={16} />

        Eliminar objetivo
      </button>
    </div>
  );
}