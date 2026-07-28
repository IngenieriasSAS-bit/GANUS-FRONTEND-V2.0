import {
    Search,
    Filter,
    CircleDot,
} from "lucide-react";

export default function ExecutionFilters({

    searchTerm,

    setSearchTerm,

    selectedStatus,

    setSelectedStatus,

    onApplyFilters,

}) {

    return (

        <section className="execution-filters">

            <div className="execution-search">

                <Search size={18} />

                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Buscar por nombre, plantilla, código, fecha, prioridad u operador..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(event) => {

    if(event.key==="Enter"){

        onApplyFilters();

    }

}}
                />

            </div>

            <div className="execution-select">

                <CircleDot size={17} />

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >

                    <option value="">
                        Todos los estados
                    </option>

                    <option value="assigned">
                        Asignadas
                    </option>

                    <option value="pending">
                        Pendientes
                    </option>

                    <option value="in_progress">
                        En ejecución
                    </option>

                    <option value="completed">
                        Finalizadas
                    </option>

                    <option value="cancelled">
                        Canceladas
                    </option>

                    <option value="expired">
                        Vencidas
                    </option>

                </select>

            </div>

            <button
                className="execution-filter-button"
                onClick={onApplyFilters}
            >

                <Filter size={18} />

                Aplicar filtros

            </button>

        </section>

    );

}