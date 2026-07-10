import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Sparkles,
  ShieldAlert,
  ChartNoAxesCombined,
  ClipboardCheck,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

import "../styles/dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();

  const obtenerInformacionInicial = () => {
    const activos =
      JSON.parse(localStorage.getItem("ganus_activos")) ||
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
        id: `pesaje-${item.id || crypto.randomUUID()}`,
        tipo: "Pesaje",
        descripcion: `${item.nombre || item.animal || "Activo"} - ${
          item.peso
        } Kg`,
        responsable: "Operación",
        momento: "Registro reciente",
      })),

      ...vacunaciones.map((item) => ({
        id: `vacunacion-${item.id || crypto.randomUUID()}`,
        tipo: "Vacunación",
        descripcion: `${
          item.nombre || item.animal || "Activo"
        } - ${item.vacuna || "Vacunación registrada"}`,
        responsable: "Operación",
        momento: "Registro reciente",
      })),

      ...eventos.map((item) => ({
        id: `evento-${item.id || crypto.randomUUID()}`,
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
      categoria: "resumen",
      titulo: "Resumen de la operación",
      texto:
        "He revisado la información disponible en GANUS. La operación se mantiene estable, aunque existe una alerta crítica que conviene atender con prioridad.",
      puntos: [
        "3 alertas activas registradas",
        "1 evento clasificado como crítico",
        "6 tareas pendientes de seguimiento",
      ],
      recomendacion:
        "Priorizar la revisión del bajo consumo de alimento en el lote 4.",
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
      JSON.parse(localStorage.getItem("ganus_activos")) ||
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
      return {
        categoria: "conversacion",
        titulo: "Advisory disponible",
        texto:
          "Buenos días. Puedo ayudarte a interpretar el estado operativo registrado en GANUS y orientar la priorización de actividades.",
        puntos: [],
        recomendacion:
          "Puedes solicitar un análisis de operación, producción, alertas o indicadores.",
      };
    }

    if (
      texto.includes("estado de la finca") ||
      texto.includes("estado general") ||
      texto.includes("como esta la finca") ||
      texto.includes("operacion")
    ) {
      return {
        categoria: "operacion",
        titulo: "Estado operativo general",
        texto:
          "La operación presenta un comportamiento general estable. Los registros actuales muestran actividad operativa y seguimiento pendiente.",
        puntos: [
          `${activos.length} activos registrados en inventario`,
          `${pesajes.length} pesajes disponibles`,
          `${vacunas.length} registros de vacunación`,
          `${eventos.length} eventos operativos`,
          "3 alertas activas y 6 tareas pendientes",
        ],
        recomendacion:
          "Atender primero la alerta crítica del lote 4 y posteriormente validar las tareas programadas para hoy.",
      };
    }

    if (
      texto.includes("produccion") ||
      texto.includes("leche") ||
      texto.includes("mes")
    ) {
      return {
        categoria: "indicador",
        titulo: "Análisis de producción",
        texto:
          "La producción mensual registrada en el tablero es de 2.450 litros y mantiene una variación positiva frente al periodo anterior.",
        puntos: [
          "Producción actual: 2.450 L",
          "Variación mensual: +15 %",
          "Tendencia operativa favorable",
        ],
        recomendacion:
          "Mantener seguimiento de los próximos registros para confirmar la continuidad del crecimiento.",
      };
    }

    if (
      texto.includes("alerta") ||
      texto.includes("riesgo") ||
      texto.includes("critica")
    ) {
      return {
        categoria: "alerta",
        titulo: "Prioridades de atención",
        texto:
          "He identificado tres eventos que requieren seguimiento. Uno de ellos tiene prioridad crítica.",
        puntos: [
          "Crítica: bajo consumo de alimento en lote 4",
          "Media: temperatura alta en corral 3",
          "Media: revisión sanitaria pendiente lote 11",
        ],
        recomendacion:
          "Intervenir primero el lote 4, documentar la acción realizada y verificar posteriormente la temperatura del corral 3.",
      };
    }

    if (
      texto.includes("recomendacion") ||
      texto.includes("recomienda") ||
      texto.includes("que debo hacer") ||
      texto.includes("priorizar")
    ) {
      return {
        categoria: "recomendacion",
        titulo: "Plan de acción recomendado",
        texto:
          "Con base en el estado actual de la operación, organizaría el seguimiento en tres niveles de prioridad.",
        puntos: [
          "1. Revisar consumo de alimento del lote 4",
          "2. Verificar temperatura del corral 3",
          "3. Completar revisión sanitaria del lote 11",
        ],
        recomendacion:
          "Registrar cada intervención en GANUS para conservar la trazabilidad operativa.",
      };
    }

    if (
      texto.includes("activo") ||
      texto.includes("animal") ||
      texto.includes("ganado") ||
      texto.includes("inventario")
    ) {
      return {
        categoria: "inventario",
        titulo: "Estado del inventario",
        texto:
          activos.length > 0
            ? `GANUS registra actualmente ${activos.length} activos disponibles para seguimiento operativo.`
            : "No encuentro activos registrados actualmente en el inventario local de GANUS.",
        puntos:
          activos.length > 0
            ? [
                `${activos.length} activos identificados`,
                "Información disponible para análisis operativo",
              ]
            : [],
        recomendacion:
          activos.length > 0
            ? "Continuar asociando actividades y formularios dinámicos a los activos para fortalecer su trazabilidad."
            : "Registrar activos desde Inventario antes de realizar un análisis operacional.",
      };
    }

    if (
      texto.includes("peso") ||
      texto.includes("pesaje")
    ) {
      return {
        categoria: "indicador",
        titulo: "Seguimiento de pesajes",
        texto:
          pesajes.length > 0
            ? `Encuentro ${pesajes.length} registros de pesaje disponibles en GANUS.`
            : "No encuentro registros de pesaje disponibles actualmente.",
        puntos: [
          "Peso promedio de referencia: 412 Kg",
          "Variación mostrada: +9 %",
        ],
        recomendacion:
          "Comparar los próximos pesajes para identificar variaciones atípicas por activo.",
      };
    }

    if (
      texto.includes("vacuna") ||
      texto.includes("vacunacion") ||
      texto.includes("sanidad")
    ) {
      return {
        categoria: "seguimiento",
        titulo: "Seguimiento sanitario",
        texto: `Actualmente encuentro ${vacunas.length} registros locales de vacunación.`,
        puntos: [
          `${vacunas.length} vacunaciones registradas`,
          "Revisión sanitaria pendiente en lote 11",
        ],
        recomendacion:
          "Validar el seguimiento del lote 11 antes de cerrar las actividades sanitarias prioritarias.",
      };
    }

    if (
      texto.includes("actividad") ||
      texto.includes("tarea") ||
      texto.includes("pendiente")
    ) {
      return {
        categoria: "seguimiento",
        titulo: "Carga operativa pendiente",
        texto:
          "El tablero mantiene actividades recientes y tareas que requieren continuidad operacional.",
        puntos: [
          `${resumen.actividadesHoy} actividades recientes`,
          `${resumen.tareasPendientes} tareas pendientes`,
          "3 tareas previstas para hoy",
        ],
        recomendacion:
          "Resolver primero las tareas vinculadas con alertas activas y continuar con los seguimientos programados.",
      };
    }

    if (texto.includes("mortalidad")) {
      return {
        categoria: "indicador",
        titulo: "Indicador de mortalidad",
        texto:
          "La mortalidad se encuentra en 1,2 %, con una reducción del 0,5 % frente al periodo anterior.",
        puntos: [
          "Indicador actual: 1,2 %",
          "Variación: -0,5 %",
          "Tendencia favorable",
        ],
        recomendacion:
          "Mantener vigilancia sanitaria y revisar eventos atípicos registrados sobre los activos.",
      };
    }

    if (
      texto.includes("prenez") ||
      texto.includes("reproduccion")
    ) {
      return {
        categoria: "indicador",
        titulo: "Indicador reproductivo",
        texto:
          "La tasa de preñez se encuentra en 68 % y presenta una mejora frente al periodo anterior.",
        puntos: [
          "Tasa actual: 68 %",
          "Variación mensual: +6 %",
          "Comportamiento positivo",
        ],
        recomendacion:
          "Mantener actualizado el seguimiento reproductivo para validar la continuidad de la tendencia.",
      };
    }

    if (
      texto.includes("gracias") ||
      texto.includes("listo")
    ) {
      return {
        categoria: "conversacion",
        titulo: "Seguimiento disponible",
        texto:
          "Con gusto. Continuaré disponible para revisar la información operativa registrada en GANUS.",
        puntos: [],
        recomendacion:
          "Puedes solicitar otro análisis cuando lo necesites.",
      };
    }

    return {
      categoria: "analisis",
      titulo: "Consulta interpretada",
      texto:
        "No encuentro una relación operativa suficientemente precisa para emitir una recomendación específica sobre esa consulta.",
      puntos: [],
      recomendacion:
        "Puedes preguntarme por operación, producción, alertas, actividades, inventario, pesajes o seguimiento sanitario.",
    };
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
      id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
          tipo: "asistente",
          ...respuesta,
        },
      ]);

      setProcesandoConsulta(false);
    }, 650);
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
  onClick={() => navigate("/alertas")}
>
  Ver todas las alertas

  <ArrowRight size={17} />
</button>
              </article>
            </section>
          </div>

          <aside className="advisory-demo">
            <div className="advisory-demo-header">
              <div className="advisory-demo-brand">
                <span className="advisory-demo-brand-icon">
                  <Sparkles size={17} />
                </span>

                <div>
                  <h2>GANUS Advisory</h2>

                  <span>Asesor operativo</span>
                </div>
              </div>

              <span className="advisory-demo-estado">
                <i />

                Disponible
              </span>
            </div>

            <div className="advisory-demo-contexto">
              <span>Contexto actual</span>

              <strong>Operación general</strong>

              <p>
                Análisis basado en la información registrada
                actualmente en GANUS.
              </p>
            </div>

            <div
              ref={advisoryMensajesRef}
              className="advisory-demo-conversacion"
            >
              {mensajesAdvisory.map((mensaje) => {
                if (mensaje.tipo === "usuario") {
                  return (
                    <div
                      key={mensaje.id}
                      className="advisory-demo-chat advisory-demo-chat--usuario"
                    >
                      <div className="advisory-demo-chat-burbuja">
                        <span className="advisory-demo-chat-autor">
                          Tú
                        </span>

                        <p>{mensaje.texto}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <article
                    key={mensaje.id}
                    className="advisory-respuesta"
                  >
                    <div className="advisory-respuesta__header">
                      <span className="advisory-respuesta__icon">
                        <Bot size={15} />
                      </span>

                      <div>
                        <strong>GANUS Advisory</strong>

                        <small>Análisis operativo</small>
                      </div>
                    </div>

                    <div className="advisory-respuesta__contenido">
                      <h3>{mensaje.titulo}</h3>

                      <p>{mensaje.texto}</p>

                      {mensaje.puntos?.length > 0 && (
                        <div className="advisory-respuesta__puntos">
                          {mensaje.puntos.map((punto) => (
                            <div key={punto}>
                              <CircleCheck size={13} />

                              <span>{punto}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {mensaje.recomendacion && (
                        <div className="advisory-respuesta__recomendacion">
                          <span>
                            <Sparkles size={13} />

                            Recomendación
                          </span>

                          <p>{mensaje.recomendacion}</p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}

              {procesandoConsulta && (
                <div className="advisory-analizando">
                  <LoaderCircle size={16} />

                  <div>
                    <strong>
                      GANUS Advisory está analizando
                    </strong>

                    <span>
                      Revisando el contexto operativo...
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="advisory-demo-opciones">
              <span className="advisory-demo-opciones-titulo">
                Consultas sugeridas
              </span>

              <div className="advisory-demo-opciones-grid">
                <button
                  type="button"
                  onClick={() =>
                    enviarConsultaAdvisory(
                      "Estado de la operación"
                    )
                  }
                >
                  <ClipboardCheck size={15} />

                  Estado operativo
                </button>

                <button
                  type="button"
                  onClick={() =>
                    enviarConsultaAdvisory(
                      "Analizar producción"
                    )
                  }
                >
                  <ChartNoAxesCombined size={15} />

                  Producción
                </button>

                <button
                  type="button"
                  onClick={() =>
                    enviarConsultaAdvisory(
                      "Alertas críticas"
                    )
                  }
                >
                  <ShieldAlert size={15} />

                  Riesgos activos
                </button>

                <button
                  type="button"
                  onClick={() =>
                    enviarConsultaAdvisory(
                      "Qué debo priorizar"
                    )
                  }
                >
                  <CircleAlert size={15} />

                  Qué priorizar
                </button>
              </div>
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
                placeholder="Consulta a GANUS Advisory..."
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
              Las recomendaciones se generan según el contexto
              operativo disponible.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}