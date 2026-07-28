import { CalendarClock } from "lucide-react";

export default function ScheduleStep({

    routine,

    setRoutine,

}) {

    const handleChange = (field, value) => {

        setRoutine({

            ...routine,

            schedule: {

                ...routine.schedule,

                [field]: value,

            },

        });

    };

    return (

        <section className="make-step">

            <div className="step-section-header">

                <div className="step-section-icon">

                    <CalendarClock size={22} />

                </div>

                <div>

                    <h3>

                        Programación de la rutina

                    </h3>

                    <p>

                        Defina cuándo comenzará la rutina y con qué frecuencia será ejecutada.

                    </p>

                </div>

            </div>

            <div className="form-grid">

                <div className="form-group">

                    <label>

                        Frecuencia

                    </label>

                    <select

                        value={routine.schedule.frequency || ""}

                        onChange={(e)=>

                            handleChange(

                                "frequency",

                                e.target.value

                            )

                        }

                    >

                        <option value="">

                            Seleccione una frecuencia

                        </option>

                        <option value="once">

                            Una sola vez

                        </option>

                        <option value="daily">

                            Diaria

                        </option>

                        <option value="weekly">

                            Semanal

                        </option>

                        <option value="monthly">

                            Mensual

                        </option>

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Hora de ejecución

                    </label>

                    <input

                        type="time"

                        value={routine.schedule.time || ""}

                        onChange={(e)=>

                            handleChange(

                                "time",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="form-group">

                    <label>

                        Fecha de inicio

                    </label>

                    <input

                        type="date"

                        value={routine.schedule.startDate || ""}

                        onChange={(e)=>

                            handleChange(

                                "startDate",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="form-group">

                    <label>

                        Fecha de finalización

                    </label>

                    <input

                        type="date"

                        value={routine.schedule.endDate || ""}

                        onChange={(e)=>

                            handleChange(

                                "endDate",

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

        </section>

    );

}