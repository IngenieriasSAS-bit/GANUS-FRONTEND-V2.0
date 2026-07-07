import { useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";
import ResumenActividades from "../components/actividades/ResumenActividades";
import RegistroActividades from "../components/actividades/RegistroActividades";

import {
  obtenerActividades,
} from "../services/actividadesService";

import {
  obtenerActivos,
} from "../services/activosService";

import "../styles/actividades.css";

export default function Actividades() {
  const [actividades] = useState(() =>
    obtenerActividades()
  );

  const [activos] = useState(() =>
    obtenerActivos()
  );

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="actividades">
        <PageHeader
          title="Actividades"
          description="Consulte y administre las actividades operativas registradas sobre los activos de GANUS."
        />

        <ResumenActividades
          actividades={actividades}
        />

        <RegistroActividades
          actividades={actividades}
          activos={activos}
        />
      </main>
    </>
  );
}