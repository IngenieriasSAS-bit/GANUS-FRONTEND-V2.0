/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import StatCard from "../components/common/StatCard";

import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  ClipboardList,
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
} from "lucide-react";

import "../styles/dashboard.css";

/**
 * ==========================================================
 * Página: Inicio
 *
 * Responsabilidad:
 * Mostrar el resumen ejecutivo y operativo de GANUS.
 *
 * Esta vista funciona actualmente con datos locales.
 *
 * Advisory GANUS se presenta únicamente como demostración
 * visual. La integración inteligente será implementada
 * posteriormente.
 * ==========================================================
 */

export default function Dashboard() {
  // ========================================================
  // Resumen ejecutivo
  // ========================================================

  const [resumen, setResumen] = useState({
    activos: 0,
    actividadesHoy: 0,
    alertasActivas: 3,
    tareasPendientes: 6,
  });

  // ========================================================
  // Actividades recientes
  // ========================================================

  const [actividadesRecientes, setActividadesRecientes] =
    useState([]);

  // ========================================================
  // Cargar información local
  // ========================================================

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResumen({
      activos: activos.length,
      actividadesHoy: actividadesLocales.length,
      alertasActivas: 3,
      tareasPendientes: 6,
    });

    setActividadesRecientes(
      actividadesLocales.reverse().slice(0, 4)
    );
  }, []);

  // ========================================================
  // Indicadores de demostración
  // ========================================================

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

  // ========================================================
  // Alertas de demostración
  // ========================================================

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

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="dashboard">
        {/* ==================================================
            Encabezado
        ================================================== */}

        <header className="inicio-encabezado">
          <div>
            <h1>Inicio</h1>

            <p>
              Resumen general de la operación y estado actual
              de GANUS.
            </p>
          </div>
        </header>

        {/* ==================================================
            Contenido principal
        ================================================== */}

        <div className="inicio-layout">
          <div className="inicio-contenido">
            {/* ==============================================
                Resumen ejecutivo
            ============================================== */}

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

            {/* ==============================================
                Indicadores clave
            ============================================== */}

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

            {/* ==============================================
                Operación reciente
            ============================================== */}

            <section className="inicio-operacion-grid">
              {/* ============================================
                  Actividades recientes
              ============================================ */}

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

              {/* ============================================
                  Alertas recientes
              ============================================ */}

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

          {/* =================================================
              Advisory GANUS
          ================================================= */}

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

            <div className="advisory-demo-mensaje">
              <p>¿En qué puedo ayudarte hoy?</p>
            </div>

            <div className="advisory-demo-opciones">
              <button type="button">
                Estado de la finca
              </button>

              <button type="button">
                Producción del mes
              </button>

              <button type="button">
                Alertas críticas
              </button>

              <button type="button">
                Recomendaciones
              </button>
            </div>

            <div className="advisory-demo-input">
              <input
                type="text"
                placeholder="Escribe tu consulta..."
                disabled
              />

              <button
                type="button"
                disabled
                aria-label="Enviar consulta"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="advisory-demo-nota">
              Vista demostrativa. Integración inteligente
              pendiente.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}      