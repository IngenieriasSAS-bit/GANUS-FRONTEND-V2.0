import useOperacion from "../hooks/useOperacion";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import PageHeader from "../components/common/PageHeader";

import OperacionDashboard from "../components/operacion/OperacionDashboard";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/operacion.css";

export default function Operacion() {

  const {
    dashboard,
} = useOperacion();

const navigate = useNavigate();

  return (
    <>

      <Sidebar />

      <Navbar />

      <main className="operacion">

    <button

        className="ganus-back-button"

        onClick={() => navigate("/field-engine")}

    >

        <ArrowLeft size={18} />

        Volver a Field Engine

    </button>

    <PageHeader
        title="Operación"
        description="Centro operativo para la supervisión de órdenes, rutinas y actividad del negocio ganadero."
    />

    <OperacionDashboard
        dashboard={dashboard}
    />

</main>

    </>
  );

}