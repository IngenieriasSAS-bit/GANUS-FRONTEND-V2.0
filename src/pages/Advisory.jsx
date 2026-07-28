import { useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowUp,
  BellRing,
  Boxes,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileSearch2,
  FileText,
  Gauge,
  Layers3,
  Lightbulb,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Target,
  Trash2,
  WandSparkles,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import {
  obtenerRespuestaAdvisory,
} from "../services/advisoryService";

import {
  detectarIntencionFormulario,
  generarPropuestaFormulario,
} from "../services/advisoryFormService";

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

const orientacionFormularioRecibido = {
  categoria: "Diseño de formulario",
  estado: "Formulario generado",
  titulo: "Formulario propuesto por Advisory",

  analisis:
    "Advisory interpretó la necesidad operativa recibida desde Inicio y generó una estructura de formulario.",

  criterio:
    "La estructura fue organizada según el contexto, las secciones y los campos necesarios para documentar la operación.",

  recomendacion:
    "Revisa el formulario generado y descárgalo si responde a la necesidad identificada.",
};

const nombresTiposCampo = {
  "short-text": "Texto corto",
  "long-text": "Texto largo",
  number: "Número",
  decimal: "Decimal",
  date: "Fecha",
  datetime: "Fecha / Hora",
  list: "Lista",
  multiselect: "Multiselección",
  boolean: "Booleano",
  user: "Usuario",
  "related-asset": "Activo relacionado",
  gps: "GPS",
  image: "Imagen",
  video: "Video",
  document: "Documento",
  signature: "Firma",
  qr: "Código QR",
  separator: "Separador",
  title: "Título",
  note: "Nota",
};

const nombresModulos = {
  inventory: "Inventario",
  make: "MAKE Control",
  operation: "Operativo",
  track: "Track",
  advisory: "Advisory",
};

const nombresTiposContexto = {
  process: "Proceso",
  "activity-type": "Tipo de actividad",
  "asset-type": "Tipo de activo",
};

function Advisory() {
  const navigate = useNavigate();
  const location = useLocation();

  const consultaRecibida =
    location.state?.consultaAdvisory?.trim() || "";

  const propuestaInicial = consultaRecibida
    ? generarPropuestaFormulario(consultaRecibida)
    : null;

  const [orientacion, setOrientacion] = useState(
    consultaRecibida
      ? orientacionFormularioRecibido
      : orientacionInicial
  );

  const [areaActiva, setAreaActiva] = useState(
    consultaRecibida ? null : "estado"
  );

  const [consulta, setConsulta] = useState("");

  const [procesando, setProcesando] = useState(false);

  const [propuestaFormulario, setPropuestaFormulario] =
    useState(propuestaInicial);

  const [ultimaConsulta, setUltimaConsulta] = useState(
    consultaRecibida ||
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
    setPropuestaFormulario(null);

    if (areaId) {
      setAreaActiva(areaId);
    } else {
      setAreaActiva(null);
    }

    setConsulta("");

    try {
      if (detectarIntencionFormulario(texto)) {
        await new Promise((resolve) =>
          setTimeout(resolve, 650)
        );

        const propuesta =
          generarPropuestaFormulario(texto);

        setPropuestaFormulario(propuesta);

        setOrientacion({
          categoria: "Diseño de formulario",
          estado: "Propuesta disponible",
          titulo: "Propuesta de formulario",

          analisis:
            "Advisory identificó una necesidad de captura estructurada y organizó una propuesta inicial.",

          criterio:
            "La propuesta define el contexto funcional, las secciones y los campos necesarios para documentar la operación.",

          recomendacion:
            "Revisa la estructura propuesta y descárgala si responde a la necesidad operativa identificada.",
        });

        return;
      }

      const respuesta =
        await obtenerRespuestaAdvisory(texto);

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

  const descartarPropuesta = () => {
    setPropuestaFormulario(null);
    setAreaActiva(null);

    setOrientacion({
      categoria: "Orientación general",
      estado: "Consulta disponible",
      titulo: "Análisis de la operación",

      analisis:
        "La propuesta de formulario fue descartada. Advisory continúa disponible para analizar la operación o estructurar una nueva necesidad de captura.",

      criterio:
        "Las propuestas deben conservarse únicamente cuando su estructura corresponda con una necesidad operativa identificada.",

      recomendacion:
        "Puedes reformular la solicitud indicando el proceso, activo o actividad que deseas registrar.",
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const descargarFormulario = () => {
    if (!propuestaFormulario) {
      return;
    }

    const contenido = {
      nombre: propuestaFormulario.name,
      descripcion: propuestaFormulario.description,

      modulo:
        nombresModulos[
          propuestaFormulario.consumerModule
        ] || propuestaFormulario.consumerModule,

      tipoContexto:
        nombresTiposContexto[
          propuestaFormulario.contextType
        ] || propuestaFormulario.contextType,

      contexto:
        propuestaFormulario.contextLabel ||
        propuestaFormulario.contextValue,

      secciones: propuestaFormulario.sections.map(
        (section) => ({
          nombre: section.name,
          descripcion: section.description,

          campos: section.fields.map((field) => ({
            nombre: field.name,

            tipo:
              nombresTiposCampo[field.type] ||
              field.type,

            obligatorio: Boolean(field.required),
          })),
        })
      ),
    };

    const archivo = new Blob(
      [JSON.stringify(contenido, null, 2)],
      {
        type: "application/json;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(archivo);

    const enlace = document.createElement("a");

    const nombreArchivo = propuestaFormulario.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    enlace.href = url;
    enlace.download = `${nombreArchivo || "formulario"}.json`;

    document.body.appendChild(enlace);

    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };

  const restablecerAnalisis = () => {
    setOrientacion(orientacionInicial);
    setAreaActiva("estado");
    setConsulta("");
    setPropuestaFormulario(null);

    setUltimaConsulta(
      "Análisis general de la operación"
    );

    navigate(location.pathname, {
      replace: true,
      state: null,
    });

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

                <span>
                  Información disponible para orientación
                </span>
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

                  const estaActiva =
                    areaActiva === area.id;

                  return (
                    <button
                      key={area.id}
                      type="button"
                      className={`advisory-sugerencia ${
                        estaActiva
                          ? "advisory-sugerencia--activa"
                          : ""
                      }`}
                      onClick={() =>
                        seleccionarArea(area)
                      }
                      disabled={procesando}
                    >
                      <span className="advisory-sugerencia__icono">
                        <Icono size={19} />
                      </span>

                      <span className="advisory-sugerencia__contenido">
                        <strong>{area.titulo}</strong>

                        <small>
                          {area.descripcion}
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="advisory-sugerencias__nota">
                <Lightbulb size={18} />

                <p>
                  La orientación considera el contexto operativo y
                  los criterios empresariales disponibles en
                  GANUS.
                </p>
              </div>
            </aside>

            <section className="advisory-consultoria">
              <header className="advisory-consultoria__header">
                <div className="advisory-consultoria__identidad">
                  <span className="advisory-consultoria__icono">
                    <Compass size={21} />
                  </span>

                  <div>
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

                    <strong>
                      {orientacion.categoria}
                    </strong>
                  </div>

                  <div>
                    <span>Estado de orientación</span>

                    <strong>
                      {orientacion.estado}
                    </strong>
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
                      <strong>
                        Revisando contexto operativo
                      </strong>

                      <p>
                        Advisory está organizando la información
                        disponible para presentar una orientación.
                      </p>
                    </div>
                  </div>
                ) : propuestaFormulario ? (
                  <section className="advisory-form-proposal">
                    <header className="advisory-form-proposal__header">
                      <span className="advisory-form-proposal__icon">
                        <WandSparkles size={22} />
                      </span>

                      <div>
                        <span>
                          Propuesta estructurada
                        </span>

                        <h3>
                          {propuestaFormulario.name}
                        </h3>

                        <p>
                          {
                            propuestaFormulario.description
                          }
                        </p>
                      </div>
                    </header>

                    <div className="advisory-form-proposal__metadata">
                      <div>
                        <span>Módulo consumidor</span>

                        <strong>
                          {nombresModulos[
                            propuestaFormulario
                              .consumerModule
                          ] ||
                            propuestaFormulario
                              .consumerModule}
                        </strong>
                      </div>

                      <div>
                        <span>Tipo de contexto</span>

                        <strong>
                          {nombresTiposContexto[
                            propuestaFormulario.contextType
                          ] ||
                            propuestaFormulario.contextType}
                        </strong>
                      </div>

                      <div>
                        <span>Contexto funcional</span>

                        <strong>
                          {propuestaFormulario.contextLabel ||
                            propuestaFormulario.contextValue}
                        </strong>
                      </div>
                    </div>

                    <div className="advisory-form-proposal__sections">
                      {propuestaFormulario.sections.map(
                        (section, sectionIndex) => (
                          <article
                            key={`${section.name}-${sectionIndex}`}
                            className="advisory-form-proposal__section"
                          >
                            <div className="advisory-form-proposal__section-header">
                              <span>
                                <Layers3 size={17} />
                              </span>

                              <div>
                                <strong>
                                  {section.name}
                                </strong>

                                {section.description && (
                                  <p>
                                    {
                                      section.description
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="advisory-form-proposal__fields">
                              {section.fields.map(
                                (
                                  field,
                                  fieldIndex
                                ) => (
                                  <div
                                    key={`${field.name}-${fieldIndex}`}
                                    className="advisory-form-proposal__field"
                                  >
                                    <span className="advisory-form-proposal__field-icon">
                                      <FileText
                                        size={15}
                                      />
                                    </span>

                                    <div>
                                      <strong>
                                        {field.name}
                                      </strong>

                                      <span>
                                        {nombresTiposCampo[
                                          field.type
                                        ] || field.type}

                                        {field.required
                                          ? " · Obligatorio"
                                          : " · Opcional"}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </article>
                        )
                      )}
                    </div>

                    <div className="advisory-form-proposal__notice">
                      <Sparkles size={18} />

                      <p>
                        Advisory propone esta estructura para
                        documentar la necesidad operativa
                        identificada. Revisa sus secciones y campos
                        antes de descargar el formulario.
                      </p>
                    </div>

                    <div className="advisory-form-proposal__actions">
                      <button
                        type="button"
                        className="advisory-form-proposal__discard"
                        onClick={descartarPropuesta}
                      >
                        <Trash2 size={17} />

                        <span>Descartar propuesta</span>
                      </button>

                      <button
                        type="button"
                        className="advisory-form-proposal__create"
                        onClick={descargarFormulario}
                      >
                        <FileText size={17} />

                        <span>
                          Descargar formulario
                        </span>
                      </button>
                    </div>
                  </section>
                ) : (
                  <div className="advisory-orientacion">
                    <article className="advisory-orientacion__bloque">
                      <div className="advisory-orientacion__encabezado">
                        <ChartNoAxesCombined
                          size={18}
                        />

                        <span>Análisis</span>
                      </div>

                      <p>{orientacion.analisis}</p>
                    </article>

                    <article className="advisory-orientacion__bloque">
                      <div className="advisory-orientacion__encabezado">
                        <FileSearch2 size={18} />

                        <span>
                          Criterio considerado
                        </span>
                      </div>

                      <p>{orientacion.criterio}</p>
                    </article>

                    <article className="advisory-orientacion__bloque advisory-orientacion__bloque--recomendacion">
                      <div className="advisory-orientacion__encabezado">
                        <Lightbulb size={18} />

                        <span>
                          Recomendación del asesor
                        </span>
                      </div>

                      <p>
                        {orientacion.recomendacion}
                      </p>
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
                      Consulta una situación o solicita una
                      propuesta de formulario operativo.
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
                    placeholder="Ejemplo: Necesito un formulario para inspeccionar maquinaria..."
                    disabled={procesando}
                  />

                  <button
                    type="submit"
                    aria-label="Solicitar orientación"
                    title="Solicitar orientación"
                    disabled={
                      !consulta.trim() || procesando
                    }
                  >
                    <ArrowUp size={19} />
                  </button>
                </div>

                <p>
                  Advisory puede orientar la operación y proponer
                  estructuras de captura según la necesidad
                  operativa identificada.
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