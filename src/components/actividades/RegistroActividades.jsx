 
import { useMemo, useState } from "react";

import {
  Eye,
  Trash2,
  Pencil,
  Search,
  SlidersHorizontal,
  X,
  Activity,
  CalendarDays,
  CircleCheck,
  FileText,
  Box,
  MapPin,
  Plus,
} from "lucide-react";

import Modal from "../common/Modal";
import {
    crearActividad,
    actualizarActividad,
    eliminarActividad,
} from "../../services/actividadesService/actividadesService";

export default function RegistroActividades({
  actividades = [],
  activos = [],
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] =
    useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("");
  const [actividadSeleccionada, setActividadSeleccionada] =
    useState(null);
    const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [actividadEditando, setActividadEditando] = useState(null);

    const [formulario, setFormulario] = useState({

    activoId: "",

    actividad: "",

    resultado: "",

    estado: "Completada",

    fecha: new Date()
        .toISOString()
        .split("T")[0],

    observacion: "",

});

const guardarActividad = () => {


    if (!formulario.activoId) {

    alert("Seleccione un activo.");

    return;

}

if (!formulario.actividad.trim()) {

    alert("Ingrese el nombre de la actividad.");

    return;

}

if (

    formulario.actividad
        .trim()
        .length < 3

) {

    alert(

        "La actividad debe tener al menos 3 caracteres."

    );

    return;

}

if (

    formulario.actividad
        .trim()
        .length > 100

) {

    alert(

        "La actividad no puede superar los 100 caracteres."

    );

    return;

}

if (!formulario.resultado.trim()) {

    alert("Ingrese el resultado de la actividad.");

    return;

}

const existeActividad = actividades.some((actividad) => {

    if (
        modoEdicion &&
        actividad.id === actividadEditando?.id
    ) {
        return false;
    }

    return (
        actividad.activoId === formulario.activoId &&

        (
            actividad.actividad ??
            actividad.tipoActividad
        )
            ?.trim()
            .toLowerCase() ===
        formulario.actividad
            .trim()
            .toLowerCase() &&

        actividad.fecha === formulario.fecha
    );

});

if (existeActividad) {

    alert(

        "Ya existe una actividad igual para ese activo en la misma fecha."

    );

    return;

}

    const datosActividad = {

    ...formulario,

    id: actividadEditando?.id,

    tipoActividad: formulario.actividad,

};

if (modoEdicion) {

    actualizarActividad(datosActividad);

} else {

    crearActividad(datosActividad);

}

    setMostrarFormulario(false);
    setModoEdicion(false);

    setActividadEditando(null);

    setFormulario({

        activoId: "",

        actividad: "",

        resultado: "",

        estado: "Completada",

        fecha: new Date()
            .toISOString()
            .split("T")[0],

        observacion: "",

    });

};

const eliminar = (actividadId) => {

    const confirmar = window.confirm(

        "¿Desea eliminar esta actividad?"

    );

    if (!confirmar) {

        return;

    }

    eliminarActividad(
        actividadId
    );

};

  const obtenerActivo = (activoId) => {
    return activos.find(
      (activo) => activo.id === activoId
    );
  };

  const formatearTipoActividad = (tipoActividad) => {
    if (!tipoActividad) {
      return "Sin tipo";
    }

    return tipoActividad
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letra) =>
        letra.toUpperCase()
      );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "Sin fecha";
    }

    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(
      new Date(`${fecha}T00:00:00`)
    );
  };

  const tiposActividad = useMemo(() => {
    return [
      ...new Set(
        actividades
          .map(
            (actividad) =>
              actividad.tipoActividad
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [actividades]);

  const estadosActividad = useMemo(() => {
    return [
      ...new Set(
        actividades
          .map((actividad) => actividad.estado)
          .filter(Boolean)
      ),
    ].sort();
  }, [actividades]);

  const actividadesFiltradas = useMemo(() => {
    const termino = busqueda
      .toLowerCase()
      .trim();

    return actividades.filter((actividad) => {
      const activo = activos.find(
        (item) =>
          item.id === actividad.activoId
      );

      const coincideBusqueda =
        !termino ||
        activo?.nombre
          ?.toLowerCase()
          .includes(termino) ||
        activo?.codigo
          ?.toLowerCase()
          .includes(termino) ||
        activo?.identificador
          ?.toLowerCase()
          .includes(termino) ||
        actividad.tipoActividad
          ?.toLowerCase()
          .includes(termino) ||
        actividad.resultado
          ?.toLowerCase()
          .includes(termino);

      const coincideTipo =
        !tipoSeleccionado ||
        actividad.tipoActividad ===
          tipoSeleccionado;

      const coincideEstado =
        !estadoSeleccionado ||
        actividad.estado ===
          estadoSeleccionado;

      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideEstado
      );
    });
  }, [
    actividades,
    activos,
    busqueda,
    tipoSeleccionado,
    estadoSeleccionado,
  ]);

  const activoSeleccionado =
    actividadSeleccionada
      ? obtenerActivo(
          actividadSeleccionada.activoId
        )
      : null;

  return (
    <>
      <section className="registro-actividades">
        <div className="registro-actividades-encabezado">
          <div>
            <h2>
              Registro Operativo de Actividades
            </h2>

            <p>
              Consulte la trazabilidad de los hechos
              operativos registrados sobre los activos
              de GANUS.
            </p>
          </div>

          <div
  style={{
    display: "flex",
    gap: "12px",
    alignItems: "center",
  }}
>

  <div className="registro-actividades-total">

    <Activity
      size={18}
      strokeWidth={1.8}
    />

    <span>
      {actividadesFiltradas.length} registros
    </span>

  </div>

  <button
    type="button"
    className="primary-button"
    onClick={() =>
        setMostrarFormulario(true)
    }
>

    <Plus size={18} />

    Nueva actividad

  </button>

</div>
        </div>

        <div className="filtros-actividades">
          <div className="buscador-actividades">
            <Search
              size={18}
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Buscar por activo, código, identificador o actividad..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(evento.target.value)
              }
            />
          </div>

          <div className="filtro-select-actividades">
            <SlidersHorizontal
              size={17}
              strokeWidth={1.8}
            />

            <select
              value={tipoSeleccionado}
              onChange={(evento) =>
                setTipoSeleccionado(
                  evento.target.value
                )
              }
            >
              <option value="">
                Todas las actividades
              </option>

              {tiposActividad.map((tipo) => (
                <option
                  key={tipo}
                  value={tipo}
                >
                  {formatearTipoActividad(tipo)}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-select-actividades">
            <CircleCheck
              size={17}
              strokeWidth={1.8}
            />

            <select
              value={estadoSeleccionado}
              onChange={(evento) =>
                setEstadoSeleccionado(
                  evento.target.value
                )
              }
            >
              <option value="">
                Todos los estados
              </option>

              {estadosActividad.map((estado) => (
                <option
                  key={estado}
                  value={estado}
                >
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tabla-actividades-contenedor">
          <table className="tabla-actividades">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Activo</th>
                <th>Código</th>
                <th>Actividad</th>
                <th>Resultado</th>
                <th>Estado</th>
                <th>Acciones</th>

              </tr>
            </thead>

            <tbody>
              {actividadesFiltradas.length > 0 ? (
                actividadesFiltradas.map(
                  (actividad) => {
                    const activo = obtenerActivo(
                      actividad.activoId
                    );

                    return (
                      <tr key={actividad.id}>
                        <td>
                          <div className="fecha-actividad">
                            <CalendarDays
                              size={16}
                              strokeWidth={1.8}
                            />

                            <span>
                              {formatearFecha(
                                actividad.fecha
                              )}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="activo-actividad">
                            <strong>
                              {activo?.nombre ||
                                "Activo no disponible"}
                            </strong>

                            <span>
                              {activo?.tipo ||
                                actividad.activoId}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="codigo-actividad">
                            {activo?.codigo ||
                              actividad.activoId}
                          </span>
                        </td>

                        <td>
                          <span className="tipo-actividad">
                            {formatearTipoActividad(
                              actividad.tipoActividad
                            )}
                          </span>
                        </td>

                        <td>
                          <span className="resultado-actividad">
                            {actividad.resultado ||
                              "Sin resultado"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`estado-actividad ${
                              actividad.estado
                                ?.toLowerCase()
                                .trim() ===
                              "completada"
                                ? "completada"
                                : "pendiente"
                            }`}
                          >
                            {actividad.estado ||
                              "Sin estado"}
                          </span>
                        </td>

                        <td>

  <div
    style={{
      display: "flex",
      gap: "8px",
      justifyContent: "center",
    }}
  >

    <button
      type="button"
      className="accion-ver-actividad"
      title="Ver detalle de actividad"
      aria-label="Ver detalle de actividad"
      onClick={() =>
        setActividadSeleccionada(
          actividad
        )
      }
    >

      <Eye
        size={17}
        strokeWidth={1.8}
      />

    </button>

        <button
    type="button"
    className="accion-ver-actividad"
    title="Editar actividad"
    aria-label="Editar actividad"
    onClick={() => {

        setModoEdicion(true);

        setActividadEditando(actividad);

        setFormulario({

            activoId: actividad.activoId,

            actividad:
                actividad.actividad ??
                actividad.tipoActividad ??
                "",

            resultado:
                actividad.resultado ?? "",

            estado:
                actividad.estado ??
                "Completada",

            fecha:
                actividad.fecha,

            observacion:
                actividad.observacion ?? "",

        });

        setMostrarFormulario(true);

    }}
>

    <Pencil
        size={17}
        strokeWidth={1.8}
    />

</button>

    <button
      type="button"
      className="accion-ver-actividad"
      title="Eliminar actividad"
      aria-label="Eliminar actividad"
      onClick={() =>
        eliminar(actividad.id)
      }
    >

      <Trash2
        size={17}
        strokeWidth={1.8}
      />

    </button>

  </div>

</td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="sin-actividades"
                  >
                    No se encontraron actividades que
                    coincidan con los criterios de
                    consulta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
    isOpen={mostrarFormulario}
    titulo={
    modoEdicion
        ? "Editar Actividad"
        : "Nueva Actividad"
}
    onClose={() => {

    setMostrarFormulario(false);

    setFormulario({

        activoId: "",

        actividad: "",

        resultado: "",

        estado: "Completada",

        fecha: new Date()
            .toISOString()
            .split("T")[0],

        observacion: "",

    });

}}
>

    <form>

    <div className="formulario-actividad">

        <div className="campo-formulario campo-observaciones">

            <label>Activo</label>

            <select
                value={formulario.activoId}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        activoId: e.target.value,
                    })
                }
            >

                <option value="">
                    Seleccione...
                </option>

                {activos.map((activo) => (

                    <option
                        key={activo.id}
                        value={activo.id}
                    >
                        {activo.codigo} - {activo.nombre}
                    </option>

                ))}

            </select>

        </div>

        <div className="campo-formulario">

            <label>Actividad</label>

            <input
                type="text"
                placeholder="Ej: Pesaje"
                value={formulario.actividad}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        actividad: e.target.value,
                    })
                }
            />

        </div>

        <div className="campo-formulario">

            <label>Resultado</label>

            <input
                type="text"
                placeholder="Resultado obtenido"
                value={formulario.resultado}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        resultado: e.target.value,
                    })
                }
            />

        </div>

        <div className="campo-formulario">

            <label>Estado</label>

            <select
                value={formulario.estado}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        estado: e.target.value,
                    })
                }
            >

                <option value="Completada">
                    Completada
                </option>

                <option value="Pendiente">
                    Pendiente
                </option>

                <option value="En proceso">
                    En proceso
                </option>

            </select>

        </div>

        <div className="campo-formulario">

            <label>Fecha</label>

            <input
                type="date"
                value={formulario.fecha}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        fecha: e.target.value,
                    })
                }
            />

        </div>

        <div className="campo-formulario">

            <label>Observaciones</label>

            <textarea
                rows={4}
                placeholder="Ingrese observaciones de la actividad..."
                value={formulario.observacion}
                onChange={(e) =>
                    setFormulario({
                        ...formulario,
                        observacion: e.target.value,
                    })
                }
            />

        </div>

        <div className="acciones-formulario">

    <button
    type="button"
    className="secondary-button"
    onClick={() => {

        setMostrarFormulario(false);

        setFormulario({

            activoId: "",

            actividad: "",

            resultado: "",

            estado: "Completada",

            fecha: new Date()
                .toISOString()
                .split("T")[0],

            observacion: "",

        });

    }}
>
    Cancelar
</button>

    <button
        type="button"
        className="primary-button"
        onClick={guardarActividad}
    >

        Guardar

    </button>

</div>

        

    </div>

</form>

</Modal>

      {actividadSeleccionada && (
        <div
          className="detalle-actividad-overlay"
          onMouseDown={() =>
            setActividadSeleccionada(null)
          }
        >
          <article
            className="detalle-actividad-panel"
            onMouseDown={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="detalle-actividad-header">
              <div>
                <span className="detalle-actividad-etiqueta">
                  Trazabilidad operativa
                </span>

                <h2>
                  Detalle de Actividad
                </h2>

                <p>
                  Información del hecho registrado sobre
                  el activo seleccionado.
                </p>
              </div>

              <button
                type="button"
                className="detalle-actividad-cerrar"
                aria-label="Cerrar detalle"
                title="Cerrar"
                onClick={() =>
                  setActividadSeleccionada(null)
                }
              >
                <X
                  size={20}
                  strokeWidth={1.8}
                />
              </button>
            </header>

            <div className="detalle-actividad-activo">
              <div className="detalle-actividad-activo-icono">
                <Box
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span>Activo relacionado</span>

                <strong>
                  {activoSeleccionado?.nombre ||
                    "Activo no disponible"}
                </strong>

                <p>
                  {activoSeleccionado?.codigo ||
                    actividadSeleccionada.activoId}
                  {" · "}
                  {activoSeleccionado?.tipo ||
                    "Sin clasificación"}
                </p>
              </div>
            </div>

            <div className="detalle-actividad-grid">
              <div className="detalle-actividad-campo">
                <div>
                  <CalendarDays
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Fecha</span>
                </div>

                <strong>
                  {formatearFecha(
                    actividadSeleccionada.fecha
                  )}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <Activity
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Tipo de actividad</span>
                </div>

                <strong>
                  {formatearTipoActividad(
                    actividadSeleccionada.tipoActividad
                  )}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <CircleCheck
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Estado</span>
                </div>

                <strong>
                  {actividadSeleccionada.estado ||
                    "Sin estado"}
                </strong>
              </div>

              <div className="detalle-actividad-campo">
                <div>
                  <FileText
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>Resultado</span>
                </div>

                <strong>
                  {actividadSeleccionada.resultado ||
                    "Sin resultado"}
                </strong>
              </div>
            </div>

            <div className="detalle-actividad-observacion">
              <div>
                <FileText
                  size={18}
                  strokeWidth={1.8}
                />

                <h3>Observación operativa</h3>
              </div>

              <p>
                {actividadSeleccionada.observacion ||
                  "La actividad no tiene una observación registrada."}
              </p>
            </div>

            {activoSeleccionado?.ubicacion && (
              <div className="detalle-actividad-ubicacion">
                <MapPin
                  size={17}
                  strokeWidth={1.8}
                />

                <span>
                  {activoSeleccionado.finca}
                  {" · "}
                  {activoSeleccionado.ubicacion}
                </span>
              </div>
            )}
          </article>
        </div>
      )}
    </>
  );
}