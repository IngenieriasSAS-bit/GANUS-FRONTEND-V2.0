import {
  CalendarClock,
  Repeat2,
} from "lucide-react";

import {
  FREQUENCY_UNITS,
  WEEK_DAYS,
} from "../../constants/fieldEngineConstants";

export default function TemplateSchedulePanel({
  schedule,
  onChange,
}) {
  const updateSchedule = (property, value) => {
    onChange({
      ...schedule,
      [property]: value,
    });
  };

  const toggleDay = (dayId) => {
    const selectedDays = schedule.specificDays || [];

    const nextDays = selectedDays.includes(dayId)
      ? selectedDays.filter((id) => id !== dayId)
      : [...selectedDays, dayId];

    updateSchedule("specificDays", nextDays);
  };

  return (
    <section className="fe-panel fe-config-card">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <CalendarClock size={19} />
        </div>

        <div>
          <h2>Agenda de ejecución</h2>
          <p>
            Define la recurrencia que MAKE utilizará para programar la operación.
          </p>
        </div>
      </div>

      <div className="fe-config-card__content">
        <label className="fe-schedule-switch">
          <span>
            <Repeat2 size={18} />

            <span>
              <strong>Formulario periódico</strong>
              <small>
                Activar configuración de recurrencia.
              </small>
            </span>
          </span>

          <input
            type="checkbox"
            checked={schedule.enabled}
            onChange={(event) =>
              updateSchedule(
                "enabled",
                event.target.checked
              )
            }
          />
        </label>

        {schedule.enabled && (
          <div className="fe-schedule-grid">
            <label className="fe-form-field">
              <span>Fecha de inicio</span>

              <input
                type="date"
                value={schedule.startDate}
                onChange={(event) =>
                  updateSchedule(
                    "startDate",
                    event.target.value
                  )
                }
              />
            </label>

            <label className="fe-form-field">
              <span>Frecuencia</span>

              <input
                type="number"
                min="1"
                value={schedule.frequency}
                onChange={(event) =>
                  updateSchedule(
                    "frequency",
                    Number(event.target.value)
                  )
                }
              />
            </label>

            <label className="fe-form-field">
              <span>Unidad</span>

              <select
                value={schedule.unit}
                onChange={(event) =>
                  updateSchedule(
                    "unit",
                    event.target.value
                  )
                }
              >
                {FREQUENCY_UNITS.map((unit) => (
                  <option
                    key={unit.id}
                    value={unit.id}
                  >
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="fe-form-field">
              <span>Fecha final</span>

              <input
                type="date"
                value={schedule.endDate}
                onChange={(event) =>
                  updateSchedule(
                    "endDate",
                    event.target.value
                  )
                }
              />
            </label>

            <label className="fe-form-field">
              <span>Máximo de ejecuciones</span>

              <input
                type="number"
                min="1"
                value={schedule.maxExecutions}
                onChange={(event) =>
                  updateSchedule(
                    "maxExecutions",
                    event.target.value
                  )
                }
                placeholder="Sin límite"
              />
            </label>

            <label className="fe-checkbox-row">
              <input
                type="checkbox"
                checked={schedule.repeat}
                onChange={(event) =>
                  updateSchedule(
                    "repeat",
                    event.target.checked
                  )
                }
              />

              <span>
                <strong>Repetición activa</strong>
                <small>
                  Mantener la recurrencia configurada.
                </small>
              </span>
            </label>

            <div className="fe-form-field fe-schedule-days">
              <span>Días específicos</span>

              <div className="fe-week-days">
                {WEEK_DAYS.map((day) => {
                  const isSelected =
                    schedule.specificDays?.includes(
                      day.id
                    );

                  return (
                    <button
                      type="button"
                      key={day.id}
                      className={
                        isSelected
                          ? "fe-week-day fe-week-day--selected"
                          : "fe-week-day"
                      }
                      onClick={() => toggleDay(day.id)}
                      title={day.name}
                    >
                      {day.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="fe-schedule-note">
          <CalendarClock size={18} />

          <p>
            Field Engine define la recurrencia. MAKE consume esta
            configuración y administra la ejecución operativa.
          </p>
        </div>
      </div>
    </section>
  );
}