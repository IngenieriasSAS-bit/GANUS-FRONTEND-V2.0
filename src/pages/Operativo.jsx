import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import PageHeader from "../components/common/PageHeader";

import OperativoDashboard from "../components/operativo/OperativoDashboard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


import "../styles/operativo.css";

export default function Operativo() {

const navigate = useNavigate();

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="operativo-page">

               <PageHeader
    title="Operativo"
    description="Centro de ejecución de órdenes de trabajo para el personal operativo."
/>

<div className="operativo-navigation">

    <button
        className="operativo-back-button"
        onClick={() => navigate(-1)}
    >
        <ArrowLeft size={18} />
        Volver
    </button>

</div>

<OperativoDashboard />

            </main>

        </>

    );

}