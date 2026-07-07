import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Database,
  LockKeyhole,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  Sun,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import "../styles/configuracion/configuracion.css";

const CONFIGURACION_INICIAL = {
  tema: "claro",
  notificaciones: true,
  alertasCriticas: true,
  resumenOperativo: true,
  sonidos: false,
  confirmaciones: true,
};

function obtenerConfiguracionInicial() {
  const configuracionGuardada = localStorage.getItem(
    "ganus-configuracion"
  );

  if (!configuracionGuardada) {
    return CONFIGURACION_INICIAL;
  }

  try {
    return {
      ...CONFIGURACION_INICIAL,
      ...JSON.parse(configuracionGuardada),
    };
  } catch {
    return CONFIGURACION_INICIAL;
  }
}

function Configuracion() {
  const [configuracion, setConfiguracion] = useState(
    obtenerConfiguracionInicial
  );

  const [guardado, setGuardado] = useState(false);

  function aplicarTema(tema) {
  document.documentElement.setAttribute(
    "data-ganus-theme",
    tema
  );

  document.body.setAttribute(
    "data-ganus-theme",
    tema
  );

  localStorage.setItem("ganus-tema", tema);
}

useEffect(() => {
  aplicarTema(configuracion.tema);
}, [configuracion.tema]);

  const reproducirSonido = () => {
    if (!configuracion.sonidos) {
      return;
    }

    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) {
        return;
      }

      const contexto = new AudioContext();
      const oscilador = contexto.createOscillator();
      const ganancia = contexto.createGain();

      oscilador.connect(ganancia);
      ganancia.connect(contexto.destination);

      oscilador.frequency.value = 620;
      ganancia.gain.value = 0.035;

      oscilador.start();

      ganancia.gain.exponentialRampToValueAtTime(
        0.0001,
        contexto.currentTime + 0.12
      );

      oscilador.stop(contexto.currentTime + 0.12);
    } catch {
      return;
    }
  };

  const actualizarConfiguracion = (campo, valor) => {
    setConfiguracion((configuracionActual) => ({
      ...configuracionActual,
      [campo]: valor,
    }));

    setGuardado(false);

    if (campo !== "sonidos") {
      reproducirSonido();
    }
  };

  const cambiarTema = (tema) => {
    actualizarConfiguracion("tema", tema);
    aplicarTema(tema);
  };

  const guardarConfiguracion = () => {
    localStorage.setItem(
      "ganus-configuracion",
      JSON.stringify(configuracion)
    );

    aplicarTema(configuracion.tema);
    reproducirSonido();

    setGuardado(true);

    window.setTimeout(() => {
      setGuardado(false);
    }, 2200);
  };

  const restaurarConfiguracion = () => {
    setConfiguracion(CONFIGURACION_INICIAL);

    localStorage.removeItem("ganus-configuracion");
    localStorage.removeItem("ganus-tema");

    aplicarTema("claro");

    setGuardado(false);
  };

  return (
    <div className="configuracion-shell">
      <Sidebar />

      <div className="configuracion-main">
        <Navbar />

        <main className="configuracion-page">
          <section className="configuracion-header">
            <div>
              <div className="configuracion-header__eyebrow">
                <Settings2 size={17} />
                Administración del sistema
              </div>

              <h1>Configuración</h1>

              <p>
                Administra las preferencias generales y el comportamiento de
                la plataforma GANUS.
              </p>
            </div>

            <div className="configuracion-header__estado">
              <span>
                <ShieldCheck size={21} />
              </span>

              <div>
                <strong>Configuración local</strong>
                <small>Preferencias del entorno actual</small>
              </div>
            </div>
          </section>

          <section className="configuracion-resumen">
            <TarjetaResumen
              icono={Palette}
              titulo="Apariencia"
              descripcion="Personalización visual de GANUS."
            />

            <TarjetaResumen
              icono={Bell}
              titulo="Notificaciones"
              descripcion="Control de avisos operativos."
            />

            <TarjetaResumen
              icono={ShieldCheck}
              titulo="Seguridad"
              descripcion="Estado y protección de la sesión."
            />

            <TarjetaResumen
              icono={Database}
              titulo="Entorno local"
              descripcion="Preferencias almacenadas localmente."
            />
          </section>

          <section className="configuracion-contenido">
            <div className="configuracion-columna">
              <article className="configuracion-panel">
                <EncabezadoPanel
                  icono={Monitor}
                  titulo="Apariencia"
                  descripcion="Define la experiencia visual de la plataforma."
                />

                <div className="configuracion-panel__body">
                  <div className="configuracion-temas">
                    <button
                      type="button"
                      className={`configuracion-tema ${
                        configuracion.tema === "claro"
                          ? "configuracion-tema--activo"
                          : ""
                      }`}
                      onClick={() => cambiarTema("claro")}
                    >
                      <span className="configuracion-tema__icono">
                        <Sun size={24} />
                      </span>

                      <div>
                        <strong>Modo claro</strong>
                        <p>
                          Interfaz luminosa para espacios de trabajo.
                        </p>
                      </div>

                      {configuracion.tema === "claro" && (
                        <Check
                          className="configuracion-tema__check"
                          size={21}
                        />
                      )}
                    </button>

                    <button
                      type="button"
                      className={`configuracion-tema ${
                        configuracion.tema === "oscuro"
                          ? "configuracion-tema--activo"
                          : ""
                      }`}
                      onClick={() => cambiarTema("oscuro")}
                    >
                      <span className="configuracion-tema__icono">
                        <Moon size={24} />
                      </span>

                      <div>
                        <strong>Modo oscuro</strong>
                        <p>
                          Interfaz oscura para reducir el brillo visual.
                        </p>
                      </div>

                      {configuracion.tema === "oscuro" && (
                        <Check
                          className="configuracion-tema__check"
                          size={21}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </article>

              <article className="configuracion-panel">
                <EncabezadoPanel
                  icono={Bell}
                  titulo="Notificaciones"
                  descripcion="Configura los avisos visibles durante la operación."
                />

                <div className="configuracion-panel__body configuracion-opciones">
                  <OpcionConfiguracion
                    titulo="Notificaciones del sistema"
                    descripcion="Permitir avisos generales de la plataforma."
                    activo={configuracion.notificaciones}
                    onChange={() =>
                      actualizarConfiguracion(
                        "notificaciones",
                        !configuracion.notificaciones
                      )
                    }
                  />

                  <OpcionConfiguracion
                    titulo="Alertas críticas"
                    descripcion="Priorizar avisos relacionados con riesgos operativos."
                    activo={configuracion.alertasCriticas}
                    deshabilitado={!configuracion.notificaciones}
                    onChange={() =>
                      actualizarConfiguracion(
                        "alertasCriticas",
                        !configuracion.alertasCriticas
                      )
                    }
                  />

                  <OpcionConfiguracion
                    titulo="Resumen operativo"
                    descripcion="Mostrar información consolidada de la operación."
                    activo={configuracion.resumenOperativo}
                    deshabilitado={!configuracion.notificaciones}
                    onChange={() =>
                      actualizarConfiguracion(
                        "resumenOperativo",
                        !configuracion.resumenOperativo
                      )
                    }
                  />

                  <OpcionConfiguracion
                    titulo="Sonidos de interfaz"
                    descripcion="Habilitar sonidos asociados a acciones del sistema."
                    activo={configuracion.sonidos}
                    onChange={() =>
                      actualizarConfiguracion(
                        "sonidos",
                        !configuracion.sonidos
                      )
                    }
                  />
                </div>
              </article>
            </div>

            <div className="configuracion-columna">
              <article className="configuracion-panel">
                <EncabezadoPanel
                  icono={LockKeyhole}
                  titulo="Seguridad y sesión"
                  descripcion="Información del entorno de acceso actual."
                />

                <div className="configuracion-panel__body">
                  <div className="configuracion-seguridad">
                    <div className="configuracion-seguridad__estado">
                      <span>
                        <ShieldCheck size={26} />
                      </span>

                      <div>
                        <strong>Sesión protegida</strong>

                        <p>
                          El acceso actual se encuentra validado por la
                          protección de rutas de GANUS.
                        </p>
                      </div>
                    </div>

                    <DetalleConfiguracion
                      titulo="Estado de sesión"
                      valor="Activa"
                    />

                    <DetalleConfiguracion
                      titulo="Tipo de entorno"
                      valor="Demostración local"
                    />

                    <DetalleConfiguracion
                      titulo="Persistencia"
                      valor="Almacenamiento local"
                    />
                  </div>
                </div>
              </article>

              <article className="configuracion-panel">
                <EncabezadoPanel
                  icono={Settings2}
                  titulo="Comportamiento"
                  descripcion="Preferencias generales de interacción."
                />

                <div className="configuracion-panel__body configuracion-opciones">
                  <OpcionConfiguracion
                    titulo="Confirmaciones de acciones"
                    descripcion="Solicitar validación visual antes de acciones importantes."
                    activo={configuracion.confirmaciones}
                    onChange={() =>
                      actualizarConfiguracion(
                        "confirmaciones",
                        !configuracion.confirmaciones
                      )
                    }
                  />
                </div>
              </article>

              <article className="configuracion-acciones">
                <div>
                  <strong>Preferencias de GANUS</strong>

                  <p>
                    Guarda los cambios realizados en este entorno.
                  </p>
                </div>

                <div className="configuracion-acciones__botones">
                  <button
                    type="button"
                    className="configuracion-boton configuracion-boton--secundario"
                    onClick={restaurarConfiguracion}
                  >
                    <RotateCcw size={18} />
                    Restaurar
                  </button>

                  <button
                    type="button"
                    className={`configuracion-boton configuracion-boton--principal ${
                      guardado
                        ? "configuracion-boton--guardado"
                        : ""
                    }`}
                    onClick={guardarConfiguracion}
                  >
                    {guardado ? (
                      <Check size={18} />
                    ) : (
                      <Save size={18} />
                    )}

                    {guardado ? "Guardado" : "Guardar cambios"}
                  </button>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function TarjetaResumen({
  icono: Icono,
  titulo,
  descripcion,
}) {
  return (
    <article className="configuracion-resumen__card">
      <span>
        <Icono size={24} />
      </span>

      <div>
        <strong>{titulo}</strong>
        <p>{descripcion}</p>
      </div>
    </article>
  );
}

function EncabezadoPanel({
  icono: Icono,
  titulo,
  descripcion,
}) {
  return (
    <header className="configuracion-panel__header">
      <div className="configuracion-panel__titulo">
        <span>
          <Icono size={22} />
        </span>

        <div>
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
        </div>
      </div>
    </header>
  );
}

function OpcionConfiguracion({
  titulo,
  descripcion,
  activo,
  deshabilitado = false,
  onChange,
}) {
  return (
    <div
      className={`configuracion-opcion ${
        deshabilitado
          ? "configuracion-opcion--deshabilitada"
          : ""
      }`}
    >
      <div>
        <strong>{titulo}</strong>
        <p>{descripcion}</p>
      </div>

      <button
        type="button"
        className={`configuracion-switch ${
          activo ? "configuracion-switch--activo" : ""
        }`}
        onClick={onChange}
        disabled={deshabilitado}
        role="switch"
        aria-checked={activo}
        aria-label={titulo}
      >
        <span />
      </button>
    </div>
  );
}

function DetalleConfiguracion({ titulo, valor }) {
  return (
    <div className="configuracion-detalle">
      <div>
        <span>{titulo}</span>
        <strong>{valor}</strong>
      </div>

      <ChevronRight size={19} />
    </div>
  );
}

export default Configuracion;