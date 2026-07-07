/**
 * ---------------------------------------------------------
 * Servicio: tareasService
 * Módulo: GANUS Tareas
 *
 * Responsabilidad:
 * Gestionar la persistencia local de tareas operativas
 * para la versión MVP.
 * ---------------------------------------------------------
 */

import { useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";
import GestionTareas from "../components/tareas/GestionTareas";

import {
  obtenerTareas,
  crearTarea,
  cambiarEstadoTarea,
} from "../services/tareasService";

import {
  obtenerActivos,
} from "../services/activosService";

import "../styles/tareas.css";

export default function Tareas() {
  const [tareas, setTareas] = useState(() =>
    obtenerTareas()
  );

  const [activos] = useState(() =>
    obtenerActivos()
  );

  const registrarTarea = (nuevaTarea) => {
    crearTarea(nuevaTarea);

    setTareas(
      obtenerTareas()
    );
  };

  const actualizarEstado = (
    tareaId,
    nuevoEstado
  ) => {
    cambiarEstadoTarea(
      tareaId,
      nuevoEstado
    );

    setTareas(
      obtenerTareas()
    );
  };

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="tareas">
        <PageHeader
          title="Tareas"
          description="Planifique y supervise las acciones operativas pendientes asociadas a los activos de GANUS."
        />

        <GestionTareas
          tareas={tareas}
          activos={activos}
          onCrearTarea={registrarTarea}
          onCambiarEstado={actualizarEstado}
        />
      </main>
    </>
  );
}