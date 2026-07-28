/**
 * ==========================================================
 * Componente: ScopeStep
 *
 * Responsabilidad:
 * Configurar el contexto operativo y el alcance de la rutina.
 * ==========================================================
 */

import { MapPinned } from "lucide-react";

import {

    enterpriseGroups,

    farms,

    lots,

    areas,

    scopeTypes,

} from "../../../constants/scopeCatalog";

export default function ScopeStep({

    routine,

    setRoutine,

}) {

    const scope = routine.scope || {};

    const handleChange = (field, value) => {

    setRoutine((prev) => ({

        ...prev,

        scope: {

            ...prev.scope,

            [field]: value,

        },

    }));

};

    const availableFarms = farms.filter(

        farm =>

            String(farm.groupId) === String(scope.groupId)

    );

    const availableLots = lots.filter(

        lot =>

            String(lot.farmId) === String(scope.farmId)

    );

    const availableAreas = areas.filter(

        area =>

            String(area.lotId) === String(scope.lotId)

    );

    return (

        <section className="make-step">

            <div className="step-section-header">

                <div className="step-section-icon">

                    <MapPinned size={22} />

                </div>

                <div>

                    <h3>

                        Contexto operativo

                    </h3>

                    <p>

                        Defina el alcance donde será ejecutada la rutina.

                    </p>

                </div>

            </div>

            <div className="form-grid">

                <div className="form-group">

                    <label>

                        Grupo Empresarial

                    </label>

                    <select

                        value={scope.groupId || ""}

                        onChange={(e) => {

    const value = e.target.value;

    setRoutine((prev) => ({

        ...prev,

        scope: {

            ...prev.scope,

            groupId: value,
            farmId: "",
            lotId: "",
            areaId: "",

        },

    }));

}}

                    >

                        <option value="">

                            Seleccione

                        </option>

                        {

                            enterpriseGroups.map(group=>(

                                <option

                                    key={group.id}

                                    value={group.id}

                                >

                                    {group.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Finca

                    </label>

                    <select

                        value={scope.farmId || ""}

                        onChange={(e) => {

    const value = e.target.value;

    setRoutine((prev) => ({

        ...prev,

        scope: {

            ...prev.scope,

            farmId: value,
            lotId: "",
            areaId: "",

        },

    }));

}}

                    >

                        <option value="">

                            Seleccione

                        </option>

                        {

                            availableFarms.map(farm=>(

                                <option

                                    key={farm.id}

                                    value={farm.id}

                                >

                                    {farm.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Lote

                    </label>

                    <select

                        value={scope.lotId || ""}

                        onChange={(e)=>{

                            handleChange("lotId", e.target.value);

                            handleChange("areaId", "");

                        }}

                    >

                        <option value="">

                            Seleccione

                        </option>

                        {

                            availableLots.map(lot=>(

                                <option

                                    key={lot.id}

                                    value={lot.id}

                                >

                                    {lot.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Área

                    </label>

                    <select

                        value={scope.areaId || ""}

                        onChange={(e)=>

                            handleChange(

                                "areaId",

                                e.target.value

                            )

                        }

                    >

                        <option value="">

                            Seleccione

                        </option>

                        {

                            availableAreas.map(area=>(

                                <option

                                    key={area.id}

                                    value={area.id}

                                >

                                    {area.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <div className="form-grid">

                <div className="form-group">

                    <label>

                        Tipo de alcance

                    </label>

                    <select

                        value={scope.scopeType || ""}

                        onChange={(e)=>

                            handleChange(

                                "scopeType",

                                e.target.value

                            )

                        }

                    >

                        <option value="">

                            Seleccione

                        </option>

                        {

                            scopeTypes.map(type=>(

                                <option

                                    key={type.id}

                                    value={type.id}

                                >

                                    {type.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Observaciones

                    </label>

                    <input

                        type="text"

                        placeholder="Observaciones del alcance..."

                        value={scope.notes || ""}

                        onChange={(e)=>

                            handleChange(

                                "notes",

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

        </section>

    );

}