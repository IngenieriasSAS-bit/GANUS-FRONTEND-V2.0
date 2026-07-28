export default function RoutineFilters({

    search,

    onSearch,

    status,

    onStatus,

}) {

    return (

        <div className="routine-filters">

            <input

                type="text"

                placeholder="Buscar rutina..."

                value={search}

                onChange={(e) =>

                    onSearch(e.target.value)

                }

                className="routine-search"

            />

            <select

                value={status}

                onChange={(e) =>

                    onStatus(e.target.value)

                }

            >

                <option value="all">

                    Todos

                </option>

                <option value="draft">

                    Borrador

                </option>

                <option value="active">

                    Activa

                </option>

                <option value="paused">

                    Pausada

                </option>

            </select>

        </div>

    );

}