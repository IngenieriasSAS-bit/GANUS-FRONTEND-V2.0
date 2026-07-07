import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Bell,
  Check,
  Search,
} from "lucide-react";


import { useAlertas } from "../hooks/useAlertas";

import "./Navbar.css";


export default function Navbar() {

  const [buscar, setBuscar] =
    useState("");

  const [
    mostrarNotificaciones,
    setMostrarNotificaciones,
  ] = useState(false);

  const [
    mostrarPerfil,
    setMostrarPerfil,
  ] = useState(false);

  const [
    alertaSeleccionada,
    setAlertaSeleccionada,
  ] = useState(null);

  const {
  alertas,
  resolverAlerta: resolverAlertaContext,
} = useAlertas();

const alertasPendientes =
  alertas.filter(
    (alerta) =>
      alerta.estado ===
      "Pendiente"
  );


  const notificacionesRef = useRef(null);

  const perfilRef = useRef(null);


  useEffect(() => {

  const cerrarPaneles = (event) => {

    if (

      notificacionesRef.current &&

      !notificacionesRef.current.contains(
        event.target
      )

    ) {

      setMostrarNotificaciones(false);

      setAlertaSeleccionada(null);

    }

    if (

      perfilRef.current &&

      !perfilRef.current.contains(
        event.target
      )

    ) {

      setMostrarPerfil(false);

    }

  };

  document.addEventListener(
    "mousedown",
    cerrarPaneles
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      cerrarPaneles
    );

  };

}, []);


  const abrirNotificaciones = () => {

    setMostrarNotificaciones(
      !mostrarNotificaciones
    );

    setMostrarPerfil(false);

    setAlertaSeleccionada(null);

  };


  const abrirPerfil = () => {

    setMostrarPerfil(
      !mostrarPerfil
    );

    setMostrarNotificaciones(false);

    setAlertaSeleccionada(null);

  };


  return (

    <div className="navbar">


      <div className="navbarLogo">

        GANUS

      </div>


      <div className="navbarBusqueda">

        <input
          type="text"
          placeholder="Buscar activo, identificador o código"
          value={buscar}
          onChange={(event) =>
            setBuscar(event.target.value)
          }
        />

      </div>


      <div className="navbarDerecha">


        <div className="iconoNav">

          <Search size={22} />

        </div>


        <div
          ref={notificacionesRef}
          className="contenedorNotificaciones"
        >


          <div
            className="iconoNav campanaNav"
            onClick={abrirNotificaciones}
            title="Alertas operativas"
          >

            <Bell size={22} />


            {
              alertasPendientes.length > 0 && (

                <span className="contadorAlertas">

                  {alertasPendientes.length}

                </span>

              )
            }

          </div>


          {
            mostrarNotificaciones && (

              <div className="panelNotificaciones">


                {
                  alertaSeleccionada

                  ?

                  (

                    <div className="detalleAlertaNavbar">


                      <div className="detalleAlertaHeader">

                        <button
                          type="button"
                          onClick={() =>
                            setAlertaSeleccionada(null)
                          }
                          title="Volver"
                        >

                          <ArrowLeft size={17} />

                        </button>


                        <div>

                          <strong>

                            Detalle de alerta

                          </strong>

                          <span>

                            Evento operativo

                          </span>

                        </div>

                      </div>


                      <div className="detalleAlertaContenido">


                        <div className="detalleAlertaTitulo">

                          <strong>

                            {
                              alertaSeleccionada.titulo
                            }

                          </strong>


                          <span
                            className={`prioridadAlerta prioridad${alertaSeleccionada.prioridad}`}
                          >

                            {
                              alertaSeleccionada.prioridad
                            }

                          </span>

                        </div>


                        <div className="detalleAlertaCampo">

                          <span>Tipo de alerta</span>

                          <strong>

                            {
                              alertaSeleccionada.tipoAlerta
                            }

                          </strong>

                        </div>


                        <div className="detalleAlertaCampo">

                          <span>Activo relacionado</span>

                          <strong>

                            {
                              alertaSeleccionada.activoId
                            }

                          </strong>

                        </div>


                        <div className="detalleAlertaCampo">

                          <span>Fecha de generación</span>

                          <strong>

                            {
                              alertaSeleccionada.fechaGeneracion
                            }

                          </strong>

                        </div>


                        <div className="detalleAlertaDescripcion">

                          <span>Situación detectada</span>

                          <p>

                            {
                              alertaSeleccionada.descripcion
                            }

                          </p>

                        </div>


                      </div>


                      <div className="detalleAlertaFooter">

                        <button
                          type="button"
                          className="btnAtenderAlerta"
                          onClick={() => {

  resolverAlertaContext(
    alertaSeleccionada.id
  );

  setAlertaSeleccionada(null);

}}
                        >

                          <Check size={16} />

                          Marcar como atendida

                        </button>

                      </div>


                    </div>

                  )

                  :

                  (

                    <>


                      <div className="panelNotificacionesHeader">

                        <strong>

                          Alertas operativas

                        </strong>

                        <span>

                          {
                            alertasPendientes.length
                          } pendientes

                        </span>

                      </div>


                      {
                        alertasPendientes.length > 0

                        ?

                        (

                          <div className="listaAlertasNavbar">


                            {
                              alertasPendientes.map(
                                (alerta) => (

                                  <article
                                    key={alerta.id}
                                    className="alertaNavbarItem"
                                  >


                                    <div className="alertaNavbarContenido">


                                      <div className="alertaNavbarTitulo">

                                        <strong>

                                          {alerta.titulo}

                                        </strong>

<small>

    {alerta.activoId}

</small>

                                        <span
                                          className={`prioridadAlerta prioridad${alerta.prioridad}`}
                                        >

                                          {
                                            alerta.prioridad
                                          }

                                        </span>

                                      </div>


                                      <p>

                                        {
                                          alerta.descripcion
                                        }

                                      </p>

<div className="alertaNavbarFooter">

    <small>

        {new Date(alerta.fechaGeneracion)
            .toLocaleDateString(
                "es-CO",
                {
                    day: "2-digit",
                    month: "short",
                }
            )}

    </small>

    <button
        type="button"
        onClick={() =>
            setAlertaSeleccionada(
                alerta
            )
        }
    >

        Ver detalle

    </button>

</div>

                                    </div>


                                  </article>

                                )
                              )
                            }


                          </div>

                        )

                        :

                        (

                          <div className="alertasNavbarVacio">

                            <Bell size={20} />

                            <p>

                              No hay alertas pendientes.

                            </p>

                          </div>

                        )
                      }


                    </>

                  )
                }


              </div>

            )
          }


        </div>


        <div
          ref={perfilRef}
          className="contenedorPerfil"
        >


          <div
            className="perfil"
            onClick={abrirPerfil}
          >

            <div className="usuario">

              S

            </div>


            <span>

              {
                localStorage.getItem("usuario")
                ||
                "Invitado"
              }

            </span>


          </div>


          {
            mostrarPerfil && (

              <div className="menuPerfil">

                <button type="button">

                  Cambiar foto

                </button>

                <button type="button">

                  Editar perfil

                </button>

                <button type="button">

                  Cambiar correo

                </button>

                <button type="button">

                  Cambiar contraseña

                </button>

              </div>

            )
          }


        </div>


      </div>


    </div>

  );

}