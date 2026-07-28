import {

    Search,

    Filter,

    RotateCcw,

} from "lucide-react";

import {

    ORDER_STATUS,

    ROUTINE_PRIORITY,

} from "../../../constants/makeConstants";

export default function WorkOrdersFilters({

    filters,

    onChange,

    onReset,

}) {

    const update = (field, value) => {

        onChange({

            ...filters,

            [field]: value,

        });

    };

    return (

        <section className="workorders-filters">

            <div className="filter-search">

                <Search size={18} />

                <input

                    type="text"

                    placeholder="Buscar por rutina..."

                    value={filters.search || ""}

                    onChange={(e)=>

                        update(

                            "search",

                            e.target.value

                        )

                    }

                />

            </div>

            <select

                value={filters.status || ""}

                onChange={(e)=>

                    update(

                        "status",

                        e.target.value

                    )

                }

            >

                <option value="">

                    Todos los estados

                </option>

                {

                    Object.values(

                        ORDER_STATUS

                    ).map(status=>(

                        <option

                            key={status}

                            value={status}

                        >

                            {status}

                        </option>

                    ))

                }

            </select>

            <select

                value={filters.priority || ""}

                onChange={(e)=>

                    update(

                        "priority",

                        e.target.value

                    )

                }

            >

                <option value="">

                    Todas las prioridades

                </option>

                {

                    ROUTINE_PRIORITY.map(priority=>(

                        <option

                            key={priority}

                            value={priority}

                        >

                            {priority}

                        </option>

                    ))

                }

            </select>

            <button

                className="filter-button"

                type="button"

            >

                <Filter size={18} />

                Filtros

            </button>

            <button

                className="reset-button"

                type="button"

                onClick={onReset}

            >

                <RotateCcw size={18} />

                Limpiar

            </button>

        </section>

    );

}