import { useEffect, useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";
import ResumenActividades from "../components/actividades/ResumenActividades";
import RegistroActividades from "../components/actividades/RegistroActividades";

import {
  obtenerActividades,
} from "../services/actividadesService/actividadesService";

import {
  obtenerActivos,
} from "../services/activosService";

import "../styles/actividades.css";

export default function Actividades() {
  const [actividades, setActividades] = useState(() =>
    obtenerActividades()
);

  const [activos] = useState(() =>
    obtenerActivos()
  );

useEffect(() => {

    const actualizar = () => {

        setActividades(
            obtenerActividades()
        );

    };

    window.addEventListener(
        "actividades-updated",
        actualizar
    );

    return () => {

        window.removeEventListener(
            "actividades-updated",
            actualizar
        );

    };

}, []);


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