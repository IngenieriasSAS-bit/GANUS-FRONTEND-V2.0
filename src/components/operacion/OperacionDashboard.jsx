import OperacionStats from "./OperacionStats";
import ActividadOperativa from "./ActividadOperativa";
import AccesosRapidos from "./AccesosRapidos";
import EstadoOperativo from "./EstadoOperativo";
import OrdenesPendientes from "./OrdenesPendientes";
import RutinasActivas from "./RutinasActivas";
import OrdenesActivas from "./OrdenesActivas";

export default function OperacionDashboard({
  dashboard,
}) {
  if (!dashboard) return null;

  return (
    <div className="operacion-dashboard">

<OperacionStats
    resumen={dashboard.resumen}
/>

<OrdenesPendientes
    cantidad={dashboard.resumen.ordenesPendientes}
/>

<RutinasActivas
    cantidad={dashboard.resumen.ordenesProceso}
/>

<ActividadOperativa
    actividad={dashboard.actividad}
/>

<OrdenesActivas

    ordenes={dashboard.ordenes}

/>

<AccesosRapidos
    accesos={dashboard.accesosRapidos}
/>

<EstadoOperativo
    estados={dashboard.estadoSistema}
/>

    </div>
  );
}