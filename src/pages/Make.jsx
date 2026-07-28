import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import PageHeader from "../components/common/PageHeader";
import PrimaryButton from "../components/common/PrimaryButton";
import Modal from "../components/common/Modal";

import MakeStats from "../components/make/dashboard/MakeStats";
import RecentRoutines from "../components/make/dashboard/RecentRoutines";
import PendingOrders from "../components/make/dashboard/PendingOrders";

import RoutineBuilder from "../components/make/routines/RoutineBuilder";
import RoutineTable from "../components/make/routines/RoutineTable";

export default function Make() {

    const navigate = useNavigate();

    const [showBuilder, setShowBuilder] = useState(false);

    const [editingRoutine, setEditingRoutine] = useState(null);

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="make">

                <div className="make-breadcrumb">

                    <button

                        className="breadcrumb-back"

                        onClick={() =>

                            navigate("/field-engine")

                        }

                    >

                        <ArrowLeft size={18} />

                        <span>

                            Volver a Field Engine

                        </span>

                    </button>

                </div>

                <PageHeader

                    title="MAKE"

                    subtitle="Planeación operativa, programación de rutinas y generación de órdenes."

                    actions={

                        <PrimaryButton

    onClick={() => {

        setEditingRoutine(null);

        setShowBuilder(true);

    }}

>


                            Nueva Rutina

                        </PrimaryButton>

                    }

                />

                <MakeStats />

                <div className="make-dashboard-grid">

                    <RecentRoutines />

                    <PendingOrders />

                </div>

                <RoutineTable

    onEdit={(routine) => {

        setEditingRoutine(routine);

        setShowBuilder(true);

    }}

/>

                <Modal

                    isOpen={showBuilder}

                    titulo="Nueva Rutina"

                    onClose={() =>

                        setShowBuilder(false)

                    }

                >

                    <RoutineBuilder
    routine={editingRoutine}
    onFinish={() => {
        setShowBuilder(false);
        setEditingRoutine(null);
    }}
/>

                </Modal>

            </main>

        </>

    );

}