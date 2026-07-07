import { useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";

import ResumenAlertas from "../components/alertas/ResumenAlertas";

import RegistroAlertas from "../components/alertas/RegistroAlertas";




import DetalleAlerta from "../components/alertas/DetalleAlerta";

import { useAlertas } from "../hooks/useAlertas";

import {
  obtenerActivos,
} from "../services/activosService";

import "../styles/alertas.css";

export default function Alertas() {

  const {
  alertas,
  resolverAlerta,
} = useAlertas();

  const [activos] = useState(() =>
  obtenerActivos()
);

const atender = (id) => {

  resolverAlerta(id);

  setAlertaSeleccionada(null);

};

const [alertaSeleccionada,
setAlertaSeleccionada] =
useState(null);

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="alertas">

        <PageHeader
          title="Alertas"
          description="Supervise los eventos operativos detectados sobre los activos registrados en GANUS."
        />

        <ResumenAlertas
          alertas={alertas}
        />

<RegistroAlertas
    alertas={
        alertas.filter(
            (alerta) =>
                alerta.estado === "Pendiente"
        )
    }
  activos={activos}
  onVerDetalle={
    setAlertaSeleccionada
  }
/>

<DetalleAlerta

  alerta={
    alertaSeleccionada
  }

  activo={
    activos.find(

      (activo)=>

      activo.id===

      alertaSeleccionada?.activoId

    )
  }

  onCerrar={()=>

    setAlertaSeleccionada(
      null
    )

  }

  onAtender={
    atender
  }

/>

      </main>

    </>
  );

}

