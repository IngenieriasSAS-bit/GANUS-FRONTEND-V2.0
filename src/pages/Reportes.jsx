import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Boxes,
  CalendarDays,
  ClipboardList,
  Download,
  FileBarChart,
  Filter,
  RefreshCcw,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import "../styles/reportes/reportes.css";

const reportesIniciales = [
  {
    id: 1,
    nombre: "Resumen general de operación",
    modulo: "Operación",
    periodo: "Julio 2026",
    estado: "Disponible",
    fecha: "06/07/2026",
  },
  {
    id: 2,
    nombre: "Seguimiento de actividades",
    modulo: "Actividades",
    periodo: "Julio 2026",
    estado: "Disponible",
    fecha: "06/07/2026",
  },
  {
    id: 3,
    nombre: "Estado actual del inventario",
    modulo: "Inventario",
    periodo: "Julio 2026",
    estado: "Disponible",
    fecha: "05/07/2026",
  },
  {
    id: 4,
    nombre: "Alertas y eventos prioritarios",
    modulo: "Alertas",
    periodo: "Julio 2026",
    estado: "Disponible",
    fecha: "05/07/2026",
  },
];

const tiposReporte = [
  {
    id: "operacion",
    titulo: "Operación general",
    descripcion: "Resumen consolidado del estado operativo.",
    icono: BarChart3,
  },
  {
    id: "actividades",
    titulo: "Actividades",
    descripcion: "Seguimiento y estado de actividades registradas.",
    icono: ClipboardList,
  },
  {
    id: "inventario",
    titulo: "Inventario",
    descripcion: "Disponibilidad y control de activos e insumos.",
    icono: Boxes,
  },
  {
    id: "alertas",
    titulo: "Alertas",
    descripcion: "Eventos y alertas que requieren seguimiento.",
    icono: AlertTriangle,
  },
];

function Reportes() {
  const [modulo, setModulo] = useState("Todos");
  const [periodo, setPeriodo] = useState("Julio 2026");
  const [busqueda, setBusqueda] = useState("");

  const reportesFiltrados = useMemo(() => {
    return reportesIniciales.filter((reporte) => {
      const coincideModulo =
        modulo === "Todos" || reporte.modulo === modulo;

      const coincideBusqueda = reporte.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      return coincideModulo && coincideBusqueda;
    });
  }, [modulo, busqueda]);

  const descargarReporte = (reporte) => {
    const contenido = [
      ["GANUS - REPORTE EMPRESARIAL"],
      ["Reporte", reporte.nombre],
      ["Módulo", reporte.modulo],
      ["Periodo", reporte.periodo],
      ["Estado", reporte.estado],
      ["Fecha", reporte.fecha],
      [],
      ["Documento generado localmente para demostración GANUS."],
    ];

    const csv = contenido
      .map((fila) => fila.map((valor) => `"${valor ?? ""}"`).join(","))
      .join("\n");

    const archivo = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = `${reporte.nombre
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };

  const limpiarFiltros = () => {
    setModulo("Todos");
    setPeriodo("Julio 2026");
    setBusqueda("");
  };

  return (
    <div className="reportes-shell">
      <Sidebar />

      <div className="reportes-shell__main">
        <Navbar />

        <main className="reportes-page">
          <section className="reportes-header">
            <div>
              <div className="reportes-header__eyebrow">
                <FileBarChart size={16} />
                <span>Consolidación operativa</span>
              </div>

              <h1>Reportes</h1>

              <p>
                Consulta, filtra y descarga información consolidada de los
                principales módulos operativos de GANUS.
              </p>
            </div>

            <div className="reportes-header__estado">
              <span>
                <Activity size={18} />
              </span>

              <div>
                <strong>Información disponible</strong>
                <small>Datos locales de demostración</small>
              </div>
            </div>
          </section>

          <section className="reportes-resumen">
            {tiposReporte.map((tipo) => {
              const Icono = tipo.icono;

              return (
                <article key={tipo.id} className="reportes-resumen__card">
                  <span className="reportes-resumen__icono">
                    <Icono size={21} />
                  </span>

                  <div>
                    <strong>{tipo.titulo}</strong>
                    <p>{tipo.descripcion}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="reportes-panel">
            <div className="reportes-panel__header">
              <div>
                <span>Centro de reportes</span>
                <h2>Reportes disponibles</h2>
              </div>

              <FileBarChart size={22} />
            </div>

            <div className="reportes-filtros">
              <div className="reportes-filtro reportes-filtro--busqueda">
                <label htmlFor="busquedaReporte">Buscar reporte</label>

                <div className="reportes-filtro__input">
                  <Filter size={17} />

                  <input
                    id="busquedaReporte"
                    type="text"
                    value={busqueda}
                    onChange={(evento) =>
                      setBusqueda(evento.target.value)
                    }
                    placeholder="Buscar por nombre..."
                  />
                </div>
              </div>

              <div className="reportes-filtro">
                <label htmlFor="moduloReporte">Módulo</label>

                <select
                  id="moduloReporte"
                  value={modulo}
                  onChange={(evento) => setModulo(evento.target.value)}
                >
                  <option>Todos</option>
                  <option>Operación</option>
                  <option>Actividades</option>
                  <option>Inventario</option>
                  <option>Alertas</option>
                </select>
              </div>

              <div className="reportes-filtro">
                <label htmlFor="periodoReporte">Periodo</label>

                <div className="reportes-filtro__select">
                  <CalendarDays size={17} />

                  <select
                    id="periodoReporte"
                    value={periodo}
                    onChange={(evento) =>
                      setPeriodo(evento.target.value)
                    }
                  >
                    <option>Julio 2026</option>
                    <option>Junio 2026</option>
                    <option>Mayo 2026</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="reportes-limpiar"
                onClick={limpiarFiltros}
              >
                <RefreshCcw size={17} />
                Limpiar
              </button>
            </div>

            <div className="reportes-tabla__contenedor">
              <table className="reportes-tabla">
                <thead>
                  <tr>
                    <th>Reporte</th>
                    <th>Módulo</th>
                    <th>Periodo</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {reportesFiltrados.map((reporte) => (
                    <tr key={reporte.id}>
                      <td>
                        <div className="reportes-tabla__reporte">
                          <span>
                            <FileBarChart size={18} />
                          </span>

                          <strong>{reporte.nombre}</strong>
                        </div>
                      </td>

                      <td>{reporte.modulo}</td>
                      <td>{reporte.periodo}</td>
                      <td>{reporte.fecha}</td>

                      <td>
                        <span className="reportes-tabla__estado">
                          {reporte.estado}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="reportes-descargar"
                          onClick={() => descargarReporte(reporte)}
                          title="Descargar reporte"
                        >
                          <Download size={17} />
                          Descargar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {reportesFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="6">
                        <div className="reportes-vacio">
                          No se encontraron reportes con los filtros
                          seleccionados.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Reportes;