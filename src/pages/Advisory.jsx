import { useRef, useState } from "react";

import {
  ArrowUp,
  BellRing,
  Boxes,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileSearch2,
  Gauge,
  Lightbulb,
  RefreshCw,
  ShieldAlert,
  Target,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import { obtenerRespuestaAdvisory } from "../services/advisoryService";

import "../styles/advisory/advisory.css";

const areasAnalisis = [
  {
    id: "estado",
    icono: ChartNoAxesCombined,
    titulo: "Estado general",
    descripcion: "Visión consolidada de la operación",
    consulta: "¿Cuál es el estado general de la operación?",
  },
  {
    id: "alertas",
    icono: BellRing,
    titulo: "Alertas y riesgos",
    descripcion: "Situaciones que requieren atención",
    consulta: "¿Qué alertas o riesgos debo priorizar?",
  },
  {
    id: "actividades",
    icono: ClipboardList,
    titulo: "Actividades",
    descripcion: "Seguimiento de ejecución operativa",
    consulta: "¿Qué actividades requieren seguimiento?",
  },
  {
    id: "inventario",
    icono: Boxes,
    titulo: "Inventario",
    descripcion: "Control y trazabilidad de activos",
    consulta: "¿Qué debo revisar en el inventario?",
  },
];

const orientacionInicial = {
  categoria: "Estado general",
  estado: "Operación estable",
  titulo: "Resumen de la operación",

  analisis:
    "La operación presenta un comportamiento estable de acuerdo con la información empresarial disponible. Existen asuntos de seguimiento relacionados con actividades pendientes, novedades sobre activos y eventos operativos registrados.",

  criterio:
    "El control operativo debe concentrarse en situaciones pendientes que puedan afectar la continuidad, la trazabilidad de los activos o el cumplimiento de las actividades programadas.",

  recomendacion:
    "Mantén seguimiento sobre las actividades pendientes, valida los activos que presentan novedades y revisa las alertas de mayor prioridad antes de realizar nuevas asignaciones operativas.",
};

function Advisory() {
  const [orientacion, setOrientacion] = useState(
    orientacionInicial
  );

  const [areaActiva, setAreaActiva] = useState("estado");

  const [consulta, setConsulta] = useState("");

  const [procesando, setProcesando] = useState(false);

  const [ultimaConsulta, setUltimaConsulta] = useState(
    "Análisis general de la operación"
  );

  const inputRef = useRef(null);

  const solicitarOrientacion = async (
    textoConsulta = consulta,
    areaId = null
  ) => {
    const texto = textoConsulta.trim();

    if (!texto || procesando) {
      return;
    }

    setProcesando(true);

    setUltimaConsulta(texto);

    if (areaId) {
      setAreaActiva(areaId);
    }

    setConsulta("");

    try {
      const respuesta = await obtenerRespuestaAdvisory(texto);

      setOrientacion(respuesta);
    } finally {
      setProcesando(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    solicitarOrientacion();
  };

  const seleccionarArea = (area) => {
    solicitarOrientacion(area.consulta, area.id);
  };

  const restablecerAnalisis = () => {
    setOrientacion(orientacionInicial);

    setAreaActiva("estado");

    setConsulta("");

    setUltimaConsulta("Análisis general de la operación");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="advisory-shell">
      <Sidebar />

      <div className="advisory-shell__main">
        <Navbar />

        <main className="advisory-page">
          <section className="advisory-header">
            <div className="advisory-header__contenido">
              <div className="advisory-header__eyebrow">
                <Compass size={21} />

                <span>Asesoría operativa</span>
              </div>

              <h1>Advisory GANUS</h1>

              <p>
                Analiza el contexto de la operación y consulta
                orientaciones basadas en criterios empresariales
                disponibles en GANUS.
              </p>
            </div>

            <div className="advisory-header__estado">
              <span className="advisory-header__estado-icono">
                <CheckCircle2 size={18} />
              </span>

              <div>
                <strong>Análisis operativo</strong>

                <span>Información disponible para orientación</span>
              </div>
            </div>
          </section>

          <section className="advisory-overview">
            <div className="advisory-overview__principal">
              <div className="advisory-overview__icono">
                <Gauge size={24} />
              </div>

              <div className="advisory-overview__contenido">
                <span className="advisory-overview__eyebrow">
                  Estado de la operación
                </span>

                <div className="advisory-overview__titulo">
                  <h2>Operación estable</h2>

                  <span>Seguimiento recomendado</span>
                </div>

                <p>
                  La información disponible permite mantener una
                  visión general de la operación y orientar la
                  revisión de asuntos que requieren seguimiento.
                </p>
              </div>
            </div>

            <div className="advisory-overview__metricas">
              <article className="advisory-overview__metrica">
                <span className="advisory-overview__metrica-icono">
                  <FileSearch2 size={18} />
                </span>

                <div>
                  <strong>3</strong>

                  <span>Áreas de seguimiento</span>
                </div>
              </article>

              <article className="advisory-overview__metrica">
                <span className="advisory-overview__metrica-icono">
                  <ShieldAlert size={18} />
                </span>

                <div>
                  <strong>1</strong>

                  <span>Prioridad operativa</span>
                </div>
              </article>

              <article className="advisory-overview__metrica">
                <span className="advisory-overview__metrica-icono">
                  <Target size={18} />
                </span>

                <div>
                  <strong>Activo</strong>

                  <span>Seguimiento empresarial</span>
                </div>
              </article>
            </div>
          </section>

          <section className="advisory-layout">
            <aside className="advisory-sugerencias">
              <div className="advisory-sugerencias__encabezado">
                <div>
                  <span>Áreas de análisis</span>

                  <h2>Enfoque de asesoría</h2>
                </div>

                <Compass size={20} />
              </div>

              <div className="advisory-sugerencias__lista">
                {areasAnalisis.map((area) => {
                  const Icono = area.icono;

                  const estaActiva = areaActiva === area.id;

                  return (
                    <button
                      key={area.id}
                      type="button"
                      className={`advisory-sugerencia ${
                        estaActiva
                          ? "advisory-sugerencia--activa"
                          : ""
                      }`}
                      onClick={() => seleccionarArea(area)}
                      disabled={procesando}
                    >
                      <span className="advisory-sugerencia__icono">
                        <Icono size={19} />
                      </span>

                      <span className="advisory-sugerencia__contenido">
                        <strong>{area.titulo}</strong>

                        <small>{area.descripcion}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="advisory-sugerencias__nota">
                <Lightbulb size={18} />

                <p>
                  La orientación considera el contexto operativo y
                  los criterios empresariales disponibles en GANUS.
                </p>
              </div>
            </aside>

            <section className="advisory-consultoria">
              <header className="advisory-consultoria__header">
                <div className="advisory-consultoria__identidad">
  <div className="advisory-consultoria__titulo">
    <Compass size={21} />
    <span>Orientación del asesor</span>

    <h2>{orientacion.titulo}</h2>
  </div>
</div>

                <button
                  type="button"
                  className="advisory-consultoria__reiniciar"
                  onClick={restablecerAnalisis}
                  disabled={procesando}
                >
                  <RefreshCw size={17} />

                  <span>Restablecer</span>
                </button>
              </header>

              <div className="advisory-consultoria__body">
                <div className="advisory-consultoria__contexto">
                  <div>
                    <span>Área analizada</span>

                    <strong>{orientacion.categoria}</strong>
                  </div>

                  <div>
                    <span>Estado de orientación</span>

                    <strong>{orientacion.estado}</strong>
                  </div>
                </div>

                <div className="advisory-consultoria__consulta">
                  <span>Consulta considerada</span>

                  <p>{ultimaConsulta}</p>
                </div>

                {procesando ? (
                  <div className="advisory-analizando">
                    <span className="advisory-analizando__icono">
                      <RefreshCw size={20} />
                    </span>

                    <div>
                      <strong>Revisando contexto operativo</strong>

                      <p>
                        Advisory está organizando la información
                        disponible para presentar una orientación.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="advisory-orientacion">
                    <article className="advisory-orientacion__bloque">
                      <div className="advisory-orientacion__encabezado">
                        <ChartNoAxesCombined size={18} />

                        <span>Análisis</span>
                      </div>

                      <p>{orientacion.analisis}</p>
                    </article>

                    <article className="advisory-orientacion__bloque">
                      <div className="advisory-orientacion__encabezado">
                        <FileSearch2 size={18} />

                        <span>Criterio considerado</span>
                      </div>

                      <p>{orientacion.criterio}</p>
                    </article>

                    <article className="advisory-orientacion__bloque advisory-orientacion__bloque--recomendacion">
                      <div className="advisory-orientacion__encabezado">
                        <Lightbulb size={18} />

                        <span>Recomendación del asesor</span>
                      </div>

                      <p>{orientacion.recomendacion}</p>
                    </article>
                  </div>
                )}
              </div>

              <form
                className="advisory-consulta"
                onSubmit={manejarSubmit}
              >
                <div className="advisory-consulta__encabezado">
                  <div>
                    <strong>Solicitar orientación</strong>

                    <span>
                      Consulta una situación relacionada con la
                      operación empresarial.
                    </span>
                  </div>
                </div>

                <div className="advisory-consulta__input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={consulta}
                    onChange={(evento) =>
                      setConsulta(evento.target.value)
                    }
                    placeholder="Describe qué aspecto de la operación deseas revisar..."
                    disabled={procesando}
                  />

                  <button
                    type="submit"
                    aria-label="Solicitar orientación"
                    title="Solicitar orientación"
                    disabled={!consulta.trim() || procesando}
                  >
                    <ArrowUp size={19} />
                  </button>
                </div>

                <p>
                  La orientación se presenta según la información y
                  los criterios disponibles en la operación.
                </p>
              </form>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Advisory;