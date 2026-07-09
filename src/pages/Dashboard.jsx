import { useEffect, useRef, useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import StatCard from "../components/common/StatCard";

import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  Milk,
  Weight,
  HeartPulse,
  TrendingDown,
  Bot,
  Syringe,
  Wrench,
  Thermometer,
  ArrowRight,
  Send,
  LoaderCircle,
} from "lucide-react";

import "../styles/dashboard.css";

export default function Dashboard() {
    const obtenerInformacionInicial = () => {
    const activos =
      JSON.parse(localStorage.getItem("activos")) ||
      JSON.parse(localStorage.getItem("animales")) ||
      [];

    const pesajes =
      JSON.parse(localStorage.getItem("pesajes")) || [];

    const vacunaciones =
      JSON.parse(localStorage.getItem("vacunas")) || [];

    const eventos =
      JSON.parse(localStorage.getItem("eventos")) || [];

    const actividadesLocales = [
      ...pesajes.map((item) => ({
        id: `pesaje-${item.id || Math.random()}`,
        tipo: "Pesaje",
        descripcion: `${item.nombre || item.animal || "Activo"} - ${
          item.peso
        } Kg`,
        responsable: "Operación",
        momento: "Registro reciente",
      })),

      ...vacunaciones.map((item) => ({
        id: `vacunacion-${item.id || Math.random()}`,
        tipo: "Vacunación",
        descripcion: `${
          item.nombre || item.animal || "Activo"
        } - ${item.vacuna || "Vacunación registrada"}`,
        responsable: "Operación",
        momento: "Registro reciente",
      })),

      ...eventos.map((item) => ({
        id: `evento-${item.id || Math.random()}`,
        tipo: "Evento",
        descripcion: `${
          item.nombre || item.animal || "Activo"
        } - ${item.tipo || "Evento operativo"}`,
        responsable: "Operación",
        momento: "Registro reciente",
      })),
    ];

    return {
      resumenInicial: {
        activos: activos.length,
        actividadesHoy: actividadesLocales.length,
        alertasActivas: 3,
        tareasPendientes: 6,
      },

      actividadesIniciales: actividadesLocales
        .reverse()
        .slice(0, 4),
    };
  };

  const [informacionInicial] = useState(
    obtenerInformacionInicial
  );

  const [resumen] = useState(
    informacionInicial.resumenInicial
  );

  const [actividadesRecientes] = useState(
    informacionInicial.actividadesIniciales
  );

  const [consulta, setConsulta] = useState("");

  const [procesandoConsulta, setProcesandoConsulta] =
    useState(false);

  const [mensajesAdvisory, setMensajesAdvisory] = useState([
    {
      id: 1,
      tipo: "asistente",
      texto: "¿En qué puedo ayudarte hoy?",
    },
  ]);

  const advisoryMensajesRef = useRef(null);

  useEffect(() => {
    if (!advisoryMensajesRef.current) {
      return;
    }

    advisoryMensajesRef.current.scrollTop =
      advisoryMensajesRef.current.scrollHeight;
  }, [mensajesAdvisory, procesandoConsulta]);

  const indicadores = [
    {
      titulo: "Producción de leche",
      valor: "2.450 L",
      variacion: "+15% vs mes anterior",
      icono: Milk,
    },
    {
      titulo: "Peso promedio",
      valor: "412 Kg",
      variacion: "+9% vs mes anterior",
      icono: Weight,
    },
    {
      titulo: "Tasa de preñez",
      valor: "68%",
      variacion: "+6% vs mes anterior",
      icono: HeartPulse,
    },
    {
      titulo: "Mortalidad",
      valor: "1,2%",
      variacion: "-0,5% vs mes anterior",
      icono: TrendingDown,
    },
  ];

  const alertasRecientes = [
    {
      id: 1,
      titulo: "Bajo consumo de alimento en lote 4",
      prioridad: "Crítica",
      momento: "Hoy 07:15 a. m.",
      icono: AlertTriangle,
    },
    {
      id: 2,
      titulo: "Temperatura alta en corral 3",
      prioridad: "Media",
      momento: "Hoy 06:40 a. m.",
      icono: Thermometer,
    },
    {
      id: 3,
      titulo: "Revisión sanitaria pendiente lote 11",
      prioridad: "Media",
      momento: "Ayer 09:30 a. m.",
      icono: HeartPulse,
    },
  ];

  const normalizarTexto = (texto) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const obtenerDatosLocales = () => {
    const activos =
      JSON.parse(localStorage.getItem("activos")) ||
      JSON.parse(localStorage.getItem("animales")) ||
      [];

    const pesajes =
      JSON.parse(localStorage.getItem("pesajes")) || [];

    const vacunas =
      JSON.parse(localStorage.getItem("vacunas")) || [];

    const eventos =
      JSON.parse(localStorage.getItem("eventos")) || [];

    return {
      activos,
      pesajes,
      vacunas,
      eventos,
    };
  };

  const generarRespuestaAdvisory = (mensaje) => {
    const texto = normalizarTexto(mensaje);

    const {
      activos,
      pesajes,
      vacunas,
      eventos,
    } = obtenerDatosLocales();

    if (
      texto.includes("hola") ||
      texto.includes("buenas") ||
      texto.includes("buen dia") ||
      texto.includes("buenos dias")
    ) {
      return `Hola. Soy Advisory GANUS en modo demostración. Actualmente puedo interpretar información operativa local sobre activos, producción, alertas y recomendaciones generales. ¿Qué deseas consultar?`;
    }

    if (
      texto.includes("estado de la finca") ||
      texto.includes("estado general") ||
      texto.includes("como esta la finca") ||
      texto.includes("operacion")
    ) {
      return `El estado operativo general se mantiene estable. GANUS registra ${activos.length} activos, ${pesajes.length} pesajes, ${vacunas.length} vacunaciones y ${eventos.length} eventos locales. Actualmente se muestran 3 alertas activas y 6 tareas pendientes. Recomiendo priorizar las alertas críticas y revisar las actividades operativas pendientes.`;
    }

    if (
      texto.includes("produccion") ||
      texto.includes("leche") ||
      texto.includes("mes")
    ) {
      return `La producción mensual de demostración se encuentra en 2.450 litros, con una variación positiva del 15 % frente al mes anterior. La tendencia mostrada por GANUS es favorable. Como siguiente acción, conviene validar si el crecimiento se mantiene durante los próximos registros operativos.`;
    }

    if (
      texto.includes("alerta") ||
      texto.includes("riesgo") ||
      texto.includes("critica")
    ) {
      return `GANUS identifica 3 alertas activas. La prioridad principal es el bajo consumo de alimento en el lote 4, clasificado como crítico. También se registra temperatura alta en el corral 3 y una revisión sanitaria pendiente en el lote 11. Recomiendo atender primero el lote 4 y documentar la acción realizada.`;
    }

    if (
      texto.includes("recomendacion") ||
      texto.includes("recomienda") ||
      texto.includes("que debo hacer") ||
      texto.includes("priorizar")
    ) {
      return `Mi recomendación operativa es priorizar tres acciones: revisar el bajo consumo de alimento del lote 4, verificar la temperatura del corral 3 y completar la revisión sanitaria pendiente del lote 11. Después, conviene actualizar los registros en GANUS para mantener la trazabilidad de la operación.`;
    }

    if (
      texto.includes("activo") ||
      texto.includes("animal") ||
      texto.includes("ganado") ||
      texto.includes("inventario")
    ) {
      if (activos.length === 0) {
        return `No encuentro activos registrados actualmente en el almacenamiento local de GANUS. Puedes registrar información en el módulo correspondiente y Advisory podrá utilizar ese dato dentro de esta demostración.`;
      }

      return `Actualmente encuentro ${activos.length} activos registrados en GANUS. Esta versión demostrativa utiliza la información almacenada localmente para construir una orientación operativa básica.`;
    }

    if (
      texto.includes("peso") ||
      texto.includes("pesaje")
    ) {
      if (pesajes.length === 0) {
        return `No encuentro registros de pesaje disponibles en este momento. Cuando existan datos locales, podré resumir la cantidad de registros y orientar una revisión general.`;
      }

      return `GANUS registra ${pesajes.length} pesajes locales. El indicador general de demostración muestra un peso promedio de 412 Kg y una variación positiva del 9 % frente al periodo anterior.`;
    }

    if (
      texto.includes("vacuna") ||
      texto.includes("vacunacion") ||
      texto.includes("sanidad")
    ) {
      return `Actualmente encuentro ${vacunas.length} registros locales de vacunación. Además, GANUS mantiene una revisión sanitaria pendiente en el lote 11. Recomiendo validar ese seguimiento antes de cerrar las actividades sanitarias prioritarias.`;
    }

    if (
      texto.includes("actividad") ||
      texto.includes("tarea") ||
      texto.includes("pendiente")
    ) {
      return `El resumen operativo muestra ${resumen.actividadesHoy} actividades registradas recientemente y ${resumen.tareasPendientes} tareas pendientes. La recomendación es atender primero las actividades relacionadas con alertas críticas y posteriormente continuar con los seguimientos programados.`;
    }

    if (
      texto.includes("mortalidad")
    ) {
      return `El indicador demostrativo de mortalidad se encuentra en 1,2 %, con una reducción del 0,5 % frente al mes anterior. La tendencia es favorable, aunque conviene mantener el seguimiento sanitario y revisar cualquier evento atípico registrado.`;
    }

    if (
      texto.includes("prenez") ||
      texto.includes("reproduccion")
    ) {
      return `La tasa de preñez demostrativa se encuentra en 68 %, con una mejora del 6 % frente al mes anterior. El comportamiento es positivo. Recomiendo mantener el seguimiento de los registros reproductivos para validar la continuidad de esta tendencia.`;
    }

    if (
      texto.includes("gracias") ||
      texto.includes("listo")
    ) {
      return `Con gusto. Puedo continuar revisando el estado operativo, producción, alertas, actividades, activos o recomendaciones generales de GANUS.`;
    }

    return `He interpretado tu consulta, pero esta versión de Advisory GANUS funciona con un motor local de demostración y todavía no utiliza el motor inteligente definitivo. Puedes preguntarme por el estado de la finca, producción del mes, alertas críticas, actividades, activos, pesajes o recomendaciones operativas.`;
  };

  const enviarConsultaAdvisory = (mensajeDirecto = "") => {
    const mensaje =
      typeof mensajeDirecto === "string" &&
      mensajeDirecto.trim()
        ? mensajeDirecto.trim()
        : consulta.trim();

    if (!mensaje || procesandoConsulta) {
      return;
    }

    const mensajeUsuario = {
      id: Date.now(),
      tipo: "usuario",
      texto: mensaje,
    };

    setMensajesAdvisory((mensajesActuales) => [
      ...mensajesActuales,
      mensajeUsuario,
    ]);

    setConsulta("");
    setProcesandoConsulta(true);

    window.setTimeout(() => {
      const respuesta = generarRespuestaAdvisory(mensaje);

      setMensajesAdvisory((mensajesActuales) => [
        ...mensajesActuales,
        {
          id: Date.now() + 1,
          tipo: "asistente",
          texto: respuesta,
        },
      ]);

      setProcesandoConsulta(false);
    }, 850);
  };

  const manejarSubmitAdvisory = (event) => {
    event.preventDefault();

    enviarConsultaAdvisory();
  };

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="dashboard">
        <header className="inicio-encabezado">
          <div>
            <h1>Inicio</h1>

            <p>
              Resumen general de la operación y estado actual
              de GANUS.
            </p>
          </div>
        </header>

        <div className="inicio-layout">
          <div className="inicio-contenido">
            <section className="inicio-seccion">
              <div className="inicio-seccion-titulo">
                <div>
                  <h2>Resumen Ejecutivo</h2>

                  <p>
                    Estado general de la operación registrada.
                  </p>
                </div>
              </div>

              <div className="resumen-grid">
                <StatCard
                  title="Activos Totales"
                  value={resumen.activos}
                  subtitle="+12% vs mes anterior"
                />

                <StatCard
                  title="Actividades Hoy"
                  value={resumen.actividadesHoy}
                  subtitle="+6% vs ayer"
                />

                <StatCard
                  title="Alertas Activas"
                  value={resumen.alertasActivas}
                  subtitle="1 crítica · 2 medias"
                />

                <StatCard
                  title="Tareas Pendientes"
                  value={resumen.tareasPendientes}
                  subtitle="3 hoy · 3 próximas"
                />
              </div>
            </section>

            <section className="inicio-seccion">
              <div className="inicio-seccion-titulo">
                <div>
                  <h2>Indicadores Clave</h2>

                  <p>
                    Indicadores operativos principales del
                    negocio.
                  </p>
                </div>
              </div>

              <div className="indicadores-grid">
                {indicadores.map((indicador) => {
                  const Icono = indicador.icono;

                  return (
                    <article
                      key={indicador.titulo}
                      className="indicador-card"
                    >
                      <div className="indicador-card-header">
                        <h3>{indicador.titulo}</h3>

                        <Icono size={24} />
                      </div>

                      <strong>{indicador.valor}</strong>

                      <p>{indicador.variacion}</p>

                      <div className="indicador-linea">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="inicio-operacion-grid">
              <article className="inicio-panel">
                <div className="inicio-panel-header">
                  <div>
                    <h2>Actividades Recientes</h2>

                    <p>
                      Últimos registros operativos realizados.
                    </p>
                  </div>

                  <Activity size={22} />
                </div>

                <div className="actividad-lista">
                  {actividadesRecientes.length > 0 ? (
                    actividadesRecientes.map((actividad) => {
                      let Icono = Wrench;

                      if (actividad.tipo === "Pesaje") {
                        Icono = Weight;
                      }

                      if (actividad.tipo === "Vacunación") {
                        Icono = Syringe;
                      }

                      return (
                        <div
                          key={actividad.id}
                          className="actividad-item"
                        >
                          <div className="actividad-icono">
                            <Icono size={19} />
                          </div>

                          <div className="actividad-informacion">
                            <strong>{actividad.tipo}</strong>

                            <span>
                              {actividad.descripcion}
                            </span>
                          </div>

                          <div className="actividad-meta">
                            <span>
                              {actividad.responsable}
                            </span>

                            <small>{actividad.momento}</small>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="inicio-vacio">
                      <CalendarCheck size={30} />

                      <strong>
                        No existen actividades recientes.
                      </strong>

                      <span>
                        Los nuevos registros operativos
                        aparecerán en esta sección.
                      </span>
                    </div>
                  )}
                </div>
              </article>

              <article className="inicio-panel">
                <div className="inicio-panel-header">
                  <div>
                    <h2>Alertas Recientes</h2>

                    <p>
                      Eventos que requieren seguimiento.
                    </p>
                  </div>

                  <AlertTriangle size={22} />
                </div>

                <div className="alertas-lista">
                  {alertasRecientes.map((alerta) => {
                    const Icono = alerta.icono;

                    return (
                      <div
                        key={alerta.id}
                        className="alerta-item"
                      >
                        <div className="alerta-icono">
                          <Icono size={19} />
                        </div>

                        <div className="alerta-informacion">
                          <strong>{alerta.titulo}</strong>

                          <div>
                            <span>{alerta.prioridad}</span>

                            <small>{alerta.momento}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="inicio-ver-mas"
                >
                  Ver todas las alertas

                  <ArrowRight size={17} />
                </button>
              </article>
            </section>
          </div>

          <aside className="advisory-demo">
            <div className="advisory-demo-header">
              <div>
                <span className="advisory-demo-etiqueta">
                  Demo
                </span>

                <h2>Advisory GANUS</h2>
              </div>

              <Bot size={25} />
            </div>

            <div className="advisory-demo-identidad">
              <div className="advisory-demo-avatar">
                <Bot size={32} />
              </div>

              <div>
                <strong>Hola, soy GANUS</strong>

                <p>
                  Tu asistente inteligente para el negocio.
                </p>
              </div>
            </div>

            <div
              ref={advisoryMensajesRef}
              className="advisory-demo-conversacion"
            >
              {mensajesAdvisory.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`advisory-demo-chat advisory-demo-chat--${mensaje.tipo}`}
                >
                  {mensaje.tipo === "asistente" && (
                    <span className="advisory-demo-chat-icono">
                      <Bot size={15} />
                    </span>
                  )}

                  <div className="advisory-demo-chat-burbuja">
                    <p>{mensaje.texto}</p>
                  </div>
                </div>
              ))}

              {procesandoConsulta && (
                <div className="advisory-demo-chat advisory-demo-chat--asistente">
                  <span className="advisory-demo-chat-icono">
                    <Bot size={15} />
                  </span>

                  <div className="advisory-demo-chat-burbuja advisory-demo-escribiendo">
                    <LoaderCircle size={15} />

                    <span>Analizando operación...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="advisory-demo-opciones">
              <button
                type="button"
                onClick={() =>
                  enviarConsultaAdvisory("Estado de la finca")
                }
              >
                Estado de la finca
              </button>

              <button
                type="button"
                onClick={() =>
                  enviarConsultaAdvisory("Producción del mes")
                }
              >
                Producción del mes
              </button>

              <button
                type="button"
                onClick={() =>
                  enviarConsultaAdvisory("Alertas críticas")
                }
              >
                Alertas críticas
              </button>

              <button
                type="button"
                onClick={() =>
                  enviarConsultaAdvisory("Recomendaciones")
                }
              >
                Recomendaciones
              </button>
            </div>

            <form
              className="advisory-demo-input"
              onSubmit={manejarSubmitAdvisory}
            >
              <input
                type="text"
                value={consulta}
                onChange={(event) =>
                  setConsulta(event.target.value)
                }
                placeholder="Escribe tu consulta..."
                disabled={procesandoConsulta}
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={
                  procesandoConsulta || !consulta.trim()
                }
                aria-label="Enviar consulta"
              >
                {procesandoConsulta ? (
                  <LoaderCircle
                    size={18}
                    className="advisory-demo-loader"
                  />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>

            <p className="advisory-demo-nota">
              Advisory GANUS · Motor local de demostración
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}