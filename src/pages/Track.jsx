import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import PageHeader from "../components/common/PageHeader";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrackDashboard from "../components/track/TrackDashboard";


import "../styles/track.css";

export default function Track() {
    const navigate = useNavigate();

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="track">

    <button

        className="ganus-back-button"

        onClick={() => navigate("/field-engine")}

    >

        <ArrowLeft size={18} />

        Volver a Field Engine

    </button>

    <PageHeader
                    title="Track"
                    description="Supervise en tiempo real la ejecución de las órdenes de trabajo generadas por el módulo MAKE."
                />

                <TrackDashboard />

            </main>

        </>

    );

}