import { X, CheckCircle2 } from "lucide-react";

export default function DetalleAlerta({
  alerta,
  activo,
  onCerrar,
  onAtender,
}) {

  if (!alerta) {
    return null;
  }

  return (

    <div
      className="detalle-alerta-overlay"
      onMouseDown={onCerrar}
    >

      <div
        className="detalle-alerta-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <header className="detalle-alerta-header">

          <div>

            <span>
              Detalle Operativo
            </span>

            <h2>
  {alerta.titulo}
</h2>

<p className="detalle-subtitulo">

  {alerta.tipoAlerta}

</p>

          </div>

          <button
            onClick={onCerrar}
          >

            <X
              size={20}
            />

          </button>

        </header>

        <section className="detalle-alerta-body">

          <div className="detalle-item">

            <label>Activo</label>

            <strong>

              {activo?.nombre}

            </strong>

          </div>

          <div className="detalle-item">

            <label>Código</label>

            <strong>

              {activo?.codigo}

            </strong>

          </div>

          <div className="detalle-item">

            <label>Fecha de generación</label>

<strong>

{new Date(
  alerta.fechaGeneracion
).toLocaleDateString(
  "es-CO",
  {
    day:"2-digit",
    month:"long",
    year:"numeric",
  }
)}

</strong>

          </div>

          <div className="detalle-item">

            <label>Prioridad</label>

            <strong>

              {alerta.prioridad}

            </strong>

         </div>

<div className="detalle-item">

<label>

Estado

</label>

<strong>

{alerta.estado}

</strong>

</div>

<div className="detalle-item">

<label>

Tipo

</label>

<strong>

{alerta.tipoAlerta}

</strong>

</div>

<div className="detalle-item detalle-completo">

<label>

Título

</label>

<strong>

{alerta.titulo}

</strong>

</div>

          <div className="detalle-item detalle-completo">

            <label>

              Descripción

            </label>

            <p>

              {alerta.descripcion}

            </p>

          </div>

        </section>

        <footer className="detalle-alerta-footer">

          {

            alerta.estado ===
            "Pendiente"

            &&

            <button

              className="btn-atender"

              onClick={()=>

                onAtender(
                  alerta.id
                )

              }

            >

              <CheckCircle2
                size={18}
              />

              Marcar como atendida

            </button>

          }

        </footer>

      </div>

    </div>

  );

}