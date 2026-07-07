import { useMemo, useState } from "react";

import {
  Link2,
  Plus,
  X,
} from "lucide-react";

import {
  crearRelacionActivo,
  obtenerRelacionesPorActivo,
} from "../../services/relacionesActivosService";


const TIPOS_RELACION = [
  {
    valor: "UBICADO_EN",
    etiqueta: "Ubicado en",
  },
  {
    valor: "INSTALADO_EN",
    etiqueta: "Instalado en",
  },
  {
    valor: "ASIGNADO_A",
    etiqueta: "Asignado a",
  },
  {
    valor: "VINCULADO_A",
    etiqueta: "Vinculado a",
  },
];


const obtenerEtiquetaRelacion = (tipoRelacion) => {

  const tipo = TIPOS_RELACION.find(
    (item) => item.valor === tipoRelacion
  );

  return tipo?.etiqueta || tipoRelacion;

};


export default function RelacionesActivo({
  activo,
  activos,
}) {

  const [relaciones, setRelaciones] = useState(() =>
    obtenerRelacionesPorActivo(activo.id)
  );

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [tipoRelacion, setTipoRelacion] =
    useState("UBICADO_EN");

  const [activoDestinoId, setActivoDestinoId] =
    useState("");


  const activosDisponibles = useMemo(() => {

    return activos.filter(
      (item) =>
        item.id !== activo.id &&
        item.estado === "Activo"
    );

  }, [activos, activo.id]);


  const obtenerActivoPorId = (activoId) => {

    return activos.find(
      (item) => item.id === activoId
    );

  };


  const cargarRelaciones = () => {

    const datos = obtenerRelacionesPorActivo(
      activo.id
    );

    setRelaciones(datos);

  };


  const cerrarFormulario = () => {

    setMostrarFormulario(false);

    setTipoRelacion("UBICADO_EN");

    setActivoDestinoId("");

  };


  const guardarRelacion = (event) => {

    event.preventDefault();

    if (!activoDestinoId) {

      return;

    }

    crearRelacionActivo({
      activoOrigenId: activo.id,
      tipoRelacion,
      activoDestinoId,
    });

    cargarRelaciones();

    cerrarFormulario();

  };


  return (

    <section className="relacionesActivo">


      <div className="relacionesActivoHeader">

        <div>

          <span>Relaciones del activo</span>

          <p>

            Conexiones operativas registradas
            con otros activos del inventario.

          </p>

        </div>


        <button
          type="button"
          className="btnNuevaRelacion"
          onClick={() =>
            setMostrarFormulario(true)
          }
        >

          <Plus size={16} />

          Nueva relación

        </button>

      </div>


      {
        relaciones.length > 0

        ?

        (

          <div className="relacionesActivoLista">

            {
              relaciones.map((relacion) => {

                const esOrigen =
                  relacion.activoOrigenId === activo.id;

                const activoRelacionado =
                  obtenerActivoPorId(
                    esOrigen
                      ? relacion.activoDestinoId
                      : relacion.activoOrigenId
                  );

                if (!activoRelacionado) {

                  return null;

                }

                return (

                  <article
                    key={relacion.id}
                    className="relacionActivoItem"
                  >

                    <div className="relacionActivoIcono">

                      <Link2 size={17} />

                    </div>


                    <div className="relacionActivoInformacion">

                      <span>

                        {
                          obtenerEtiquetaRelacion(
                            relacion.tipoRelacion
                          )
                        }

                      </span>

                      <strong>

                        {activoRelacionado.nombre}

                      </strong>

                      <small>

                        {activoRelacionado.codigo}
                        {" · "}
                        {activoRelacionado.dominio}

                      </small>

                    </div>

                  </article>

                );

              })
            }

          </div>

        )

        :

        (

          <div className="relacionesActivoVacio">

            <Link2 size={20} />

            <p>

              Este activo no tiene relaciones
              registradas.

            </p>

          </div>

        )
      }


      {
        mostrarFormulario && (

          <form
            className="formularioRelacionActivo"
            onSubmit={guardarRelacion}
          >


            <div className="formularioRelacionHeader">

              <strong>Nueva relación</strong>

              <button
                type="button"
                onClick={cerrarFormulario}
                title="Cerrar"
              >

                <X size={17} />

              </button>

            </div>


            <div className="formularioRelacionGrid">


              <label>

                Tipo de relación

                <select
                  value={tipoRelacion}
                  onChange={(event) =>
                    setTipoRelacion(
                      event.target.value
                    )
                  }
                >

                  {
                    TIPOS_RELACION.map((tipo) => (

                      <option
                        key={tipo.valor}
                        value={tipo.valor}
                      >

                        {tipo.etiqueta}

                      </option>

                    ))
                  }

                </select>

              </label>


              <label>

                Activo relacionado

                <select
                  value={activoDestinoId}
                  onChange={(event) =>
                    setActivoDestinoId(
                      event.target.value
                    )
                  }
                  required
                >

                  <option value="">

                    Seleccione un activo

                  </option>

                  {
                    activosDisponibles.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >

                          {item.codigo}
                          {" - "}
                          {item.nombre}

                        </option>

                      )
                    )
                  }

                </select>

              </label>


            </div>


            <div className="formularioRelacionFooter">

              <button
                type="button"
                className="btnCancelarRelacion"
                onClick={cerrarFormulario}
              >

                Cancelar

              </button>


              <button
                type="submit"
                className="btnGuardarRelacion"
              >

                Guardar relación

              </button>

            </div>


          </form>

        )
      }


    </section>

  );

}