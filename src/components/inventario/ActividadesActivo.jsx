import { useState } from "react";

import {
  Activity,
  Plus,
  X,
} from "lucide-react";

import {
  crearActividad,
  obtenerActividadesPorActivo,
} from "../../services/actividadesService";


const TIPOS_ACTIVIDAD = [
  {
    valor: "PESAJE",
    etiqueta: "Pesaje",
  },
  {
    valor: "MANTENIMIENTO_PREVENTIVO",
    etiqueta: "Mantenimiento preventivo",
  },
  {
    valor: "INSPECCION",
    etiqueta: "Inspección",
  },
  {
    valor: "REVISION_OPERATIVA",
    etiqueta: "Revisión operativa",
  },
];


const obtenerEtiquetaActividad = (tipoActividad) => {

  const tipo = TIPOS_ACTIVIDAD.find(
    (item) =>
      item.valor === tipoActividad
  );

  return tipo?.etiqueta || tipoActividad;

};


export default function ActividadesActivo({
  activo,
}) {

  const [actividades, setActividades] =
    useState(() =>
      obtenerActividadesPorActivo(activo.id)
    );

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [tipoActividad, setTipoActividad] =
    useState("INSPECCION");

  const [fecha, setFecha] =
    useState("");

  const [resultado, setResultado] =
    useState("");

  const [observacion, setObservacion] =
    useState("");


  const cargarActividades = () => {

    const datos =
      obtenerActividadesPorActivo(
        activo.id
      );

    setActividades(datos);

  };


  const cerrarFormulario = () => {

    setMostrarFormulario(false);

    setTipoActividad("INSPECCION");

    setFecha("");

    setResultado("");

    setObservacion("");

  };


  const guardarActividad = (event) => {

    event.preventDefault();

    if (
      !fecha ||
      !resultado.trim()
    ) {

      return;

    }

    crearActividad({
      activoId: activo.id,
      tipoActividad,
      fecha,
      resultado: resultado.trim(),
      observacion: observacion.trim(),
      estado: "Completada",
    });

    cargarActividades();

    cerrarFormulario();

  };


  return (

    <section className="actividadesActivo">


      <div className="actividadesActivoHeader">

        <div>

          <span>Historial de actividades</span>

          <p>

            Hechos operativos registrados
            sobre este activo.

          </p>

        </div>


        <button
          type="button"
          className="btnNuevaActividad"
          onClick={() =>
            setMostrarFormulario(true)
          }
        >

          <Plus size={16} />

          Nueva actividad

        </button>

      </div>


      {
        actividades.length > 0

        ?

        (

          <div className="actividadesActivoLista">

            {
              actividades.map(
                (actividad) => (

                  <article
                    key={actividad.id}
                    className="actividadActivoItem"
                  >


                    <div className="actividadActivoIcono">

                      <Activity size={17} />

                    </div>


                    <div className="actividadActivoInformacion">

                      <div className="actividadActivoTitulo">

                        <strong>

                          {
                            obtenerEtiquetaActividad(
                              actividad.tipoActividad
                            )
                          }

                        </strong>

                        <span>

                          {actividad.fecha}

                        </span>

                      </div>


                      <p>

                        {actividad.resultado}

                      </p>


                      {
                        actividad.observacion && (

                          <small>

                            {actividad.observacion}

                          </small>

                        )
                      }


                    </div>


                  </article>

                )
              )
            }

          </div>

        )

        :

        (

          <div className="actividadesActivoVacio">

            <Activity size={20} />

            <p>

              Este activo no tiene actividades
              registradas.

            </p>

          </div>

        )
      }


      {
        mostrarFormulario && (

          <form
            className="formularioActividadActivo"
            onSubmit={guardarActividad}
          >


            <div className="formularioActividadHeader">

              <strong>Nueva actividad</strong>


              <button
                type="button"
                onClick={cerrarFormulario}
                title="Cerrar"
              >

                <X size={17} />

              </button>

            </div>


            <div className="formularioActividadGrid">


              <label>

                Tipo de actividad

                <select
                  value={tipoActividad}
                  onChange={(event) =>
                    setTipoActividad(
                      event.target.value
                    )
                  }
                >

                  {
                    TIPOS_ACTIVIDAD.map(
                      (tipo) => (

                        <option
                          key={tipo.valor}
                          value={tipo.valor}
                        >

                          {tipo.etiqueta}

                        </option>

                      )
                    )
                  }

                </select>

              </label>


              <label>

                Fecha

                <input
                  type="date"
                  value={fecha}
                  onChange={(event) =>
                    setFecha(
                      event.target.value
                    )
                  }
                  required
                />

              </label>


              <label>

                Resultado

                <input
                  type="text"
                  value={resultado}
                  onChange={(event) =>
                    setResultado(
                      event.target.value
                    )
                  }
                  placeholder="Resultado de la actividad"
                  required
                />

              </label>


              <label>

                Observación

                <input
                  type="text"
                  value={observacion}
                  onChange={(event) =>
                    setObservacion(
                      event.target.value
                    )
                  }
                  placeholder="Observación opcional"
                />

              </label>


            </div>


            <div className="formularioActividadFooter">


              <button
                type="button"
                className="btnCancelarActividad"
                onClick={cerrarFormulario}
              >

                Cancelar

              </button>


              <button
                type="submit"
                className="btnGuardarActividad"
              >

                Guardar actividad

              </button>


            </div>


          </form>

        )
      }


    </section>

  );

}