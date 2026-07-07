import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function IndicadorAcciones({
  onEditar,
  onEliminar,
}) {
  return (
    <div className="knowledge-indicador-actions-menu">
      <button
        type="button"
        onClick={onEditar}
      >
        <Pencil size={16} />

        Editar indicador
      </button>

      <button
        type="button"
        className="knowledge-indicador-actions-delete"
        onClick={onEliminar}
      >
        <Trash2 size={16} />

        Eliminar indicador
      </button>
    </div>
  );
}