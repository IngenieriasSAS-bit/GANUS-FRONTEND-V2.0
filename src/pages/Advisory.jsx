import { useRef, useState } from "react";
import {
  ArrowUp,
  BellRing,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import { obtenerRespuestaAdvisory } from "../services/advisoryService";
import "../styles/advisory/advisory.css";

const consultasSugeridas = [
  {
    id: 1,
    icono: ChartNoAxesCombined,
    titulo: "Estado general",
    pregunta: "¿Cuál es el estado general de la operación?",
  },
  {
    id: 2,
    icono: BellRing,
    titulo: "Alertas y riesgos",
    pregunta: "¿Qué alertas o riesgos debo priorizar?",
  },
  {
    id: 3,
    icono: ClipboardList,
    titulo: "Actividades",
    pregunta: "¿Qué actividades requieren seguimiento?",
  },
  {
    id: 4,
    icono: Boxes,
    titulo: "Inventario",
    pregunta: "¿Qué debo revisar en el inventario?",
  },
];

const mensajeInicial = {
  tipo: "advisory",
  contenido:
    "Bienvenido a Advisory GANUS. Puedo ayudarte a interpretar el estado operativo y orientar la priorización de actividades, alertas, inventario e indicadores.",
};

function Advisory() {
  const [mensajes, setMensajes] = useState([mensajeInicial]);
  const [consulta, setConsulta] = useState("");
  const [procesando, setProcesando] = useState(false);

  const inputRef = useRef(null);

  const enviarConsulta = async (textoConsulta = consulta) => {
    const texto = textoConsulta.trim();

    if (!texto || procesando) {
      return;
    }

    const mensajeUsuario = {
      tipo: "usuario",
      contenido: texto,
    };

    setMensajes((mensajesActuales) => [
      ...mensajesActuales,
      mensajeUsuario,
    ]);

    setConsulta("");
    setProcesando(true);

    try {
      const respuesta = await obtenerRespuestaAdvisory(texto);

      const mensajeAdvisory = {
        tipo: "advisory",
        contenido: respuesta,
      };

      setMensajes((mensajesActuales) => [
        ...mensajesActuales,
        mensajeAdvisory,
      ]);
    } finally {
      setProcesando(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    enviarConsulta();
  };

  const reiniciarConversacion = () => {
    setMensajes([mensajeInicial]);
    setConsulta("");

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
                <Sparkles size={15} />
                <span>Asistencia estratégica</span>
              </div>

              <h1>Advisory GANUS</h1>

              <p>
                Consulta el estado de la operación y recibe orientación basada
                en criterios empresariales definidos para la demostración.
              </p>
            </div>

            <div className="advisory-header__estado">
              <span className="advisory-header__estado-icono">
                <CheckCircle2 size={17} />
              </span>

              <div>
                <strong>Servicio disponible</strong>
                <span>Motor local de demostración</span>
              </div>
            </div>
          </section>

          <section className="advisory-layout">
            <aside className="advisory-sugerencias">
              <div className="advisory-sugerencias__encabezado">
                <div>
                  <span>Consultas rápidas</span>
                  <h2>¿Qué deseas analizar?</h2>
                </div>

                <Lightbulb size={20} />
              </div>

              <div className="advisory-sugerencias__lista">
                {consultasSugeridas.map((consultaSugerida) => {
                  const Icono = consultaSugerida.icono;

                  return (
                    <button
                      key={consultaSugerida.id}
                      type="button"
                      className="advisory-sugerencia"
                      onClick={() =>
                        enviarConsulta(consultaSugerida.pregunta)
                      }
                      disabled={procesando}
                    >
                      <span className="advisory-sugerencia__icono">
                        <Icono size={19} />
                      </span>

                      <span className="advisory-sugerencia__contenido">
                        <strong>{consultaSugerida.titulo}</strong>
                        <small>{consultaSugerida.pregunta}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="advisory-sugerencias__nota">
                <Bot size={18} />

                <p>
                  Demo local preparada para una futura integración con el motor
                  inteligente de GANUS.
                </p>
              </div>
            </aside>

            <section className="advisory-chat">
              <header className="advisory-chat__header">
                <div className="advisory-chat__identidad">
                  <span className="advisory-chat__avatar">
                    <Bot size={21} />
                  </span>

                  <div>
                    <h2>Asistente empresarial</h2>
                    <p>Advisory GANUS</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="advisory-chat__reiniciar"
                  onClick={reiniciarConversacion}
                  disabled={procesando}
                >
                  <RotateCcw size={17} />
                  <span>Reiniciar</span>
                </button>
              </header>

              <div className="advisory-chat__mensajes">
                {mensajes.map((mensaje, indice) => (
                  <div
                    key={`${mensaje.tipo}-${indice}`}
                    className={`advisory-mensaje advisory-mensaje--${mensaje.tipo}`}
                  >
                    {mensaje.tipo === "advisory" && (
                      <span className="advisory-mensaje__avatar">
                        <Bot size={18} />
                      </span>
                    )}

                    <div className="advisory-mensaje__contenido">
                      <span className="advisory-mensaje__autor">
                        {mensaje.tipo === "advisory"
                          ? "Advisory GANUS"
                          : "Tú"}
                      </span>

                      <p>{mensaje.contenido}</p>
                    </div>
                  </div>
                ))}

                {procesando && (
                  <div className="advisory-mensaje advisory-mensaje--advisory">
                    <span className="advisory-mensaje__avatar">
                      <Bot size={18} />
                    </span>

                    <div className="advisory-mensaje__contenido">
                      <span className="advisory-mensaje__autor">
                        Advisory GANUS
                      </span>

                      <div className="advisory-escribiendo">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form
                className="advisory-chat__composer"
                onSubmit={manejarSubmit}
              >
                <div className="advisory-chat__input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={consulta}
                    onChange={(evento) =>
                      setConsulta(evento.target.value)
                    }
                    placeholder="Consulta sobre la operación empresarial..."
                    disabled={procesando}
                  />

                  <button
                    type="submit"
                    aria-label="Enviar consulta"
                    disabled={!consulta.trim() || procesando}
                  >
                    <ArrowUp size={19} />
                  </button>
                </div>

                <p>
                  Advisory GANUS utiliza un motor local en esta versión de
                  demostración.
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