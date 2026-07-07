import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import PageHeader from "../components/common/PageHeader";

import IndicadoresDashboard from "../components/indicadores/IndicadoresDashboard";

import "../styles/indicadores.css";

export default function Indicadores() {

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="indicadores">

                <PageHeader

                    title="Indicadores"

                    description="Supervise en tiempo real el rendimiento operativo, el estado de los activos y los principales indicadores estratégicos de GANUS."

                />

                <IndicadoresDashboard />

            </main>

        </>

    );

}