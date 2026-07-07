import { Search, Filter } from "lucide-react";

export default function FiltrosAlertas({
  busqueda,
  setBusqueda,
  estado,
  setEstado,
  prioridad,
  setPrioridad,
}) {
  return (
    <div className="alertas-filtros">

      <div className="alertas-buscador">

        <Search size={18} />

        <input
          type="text"
          placeholder="Buscar por activo, código o alerta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

      </div>

      <div className="alertas-selects">

        <div className="alertas-select">

          <Filter size={16} />

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Atendida">Atendida</option>
          </select>

        </div>

        <div className="alertas-select">

          <Filter size={16} />

          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="">Todas las prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>

        </div>

      </div>

    </div>
  );
}