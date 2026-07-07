import { useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";

import ResumenKnowledge from "../components/knowledge/ResumenKnowledge";
import ModeloConocimiento from "../components/knowledge/ModeloConocimiento";
import ActividadKnowledge from "../components/knowledge/ActividadKnowledge";
import EstadoMotor from "../components/knowledge/EstadoMotor";
import ObjetivosEstrategicos from "../components/knowledge/ObjetivosEstrategicos";
import IndicadoresKnowledge from "../components/knowledge/IndicadorKnowledge";
import PrincipiosNegocio from "../components/knowledge/PrincipiosNegocio";
import ReglasKnowledge from "../components/knowledge/ReglasKnowledge";

import "../styles/knowledge/knowledge.css";

export default function Knowledge() {
  const [vistaActiva, setVistaActiva] = useState("principal");

  return (
    <>
      <Sidebar />

      <Navbar />

      <main className="knowledge">
        {vistaActiva === "principal" && (
          <>
            <PageHeader
              title="Knowledge Studio"
              description="Administre la estrategia, los indicadores y las reglas que definen el comportamiento inteligente de GANUS."
            />

            <ResumenKnowledge />

            <ModeloConocimiento
              onGestionar={setVistaActiva}
            />

            <div className="knowledge-bottom-grid">
              <ActividadKnowledge />

              <EstadoMotor />
            </div>
          </>
        )}

        {vistaActiva === "objetivos" && (
          <ObjetivosEstrategicos
            onVolver={() =>
              setVistaActiva("principal")
            }
          />
        )}

        {vistaActiva === "indicadores" && (
          <IndicadoresKnowledge
            onVolver={() =>
              setVistaActiva("principal")
            }
          />
        )}

        {vistaActiva === "principios" && (
  <PrincipiosNegocio
    onVolver={() =>
      setVistaActiva("principal")
    }
  />
)}

{vistaActiva === "reglas" && (
  <ReglasKnowledge
    onVolver={() =>
      setVistaActiva("principal")
    }
  />
)}

      </main>
    </>
  );
}