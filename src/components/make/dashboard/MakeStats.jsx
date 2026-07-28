import useMake from "../../../hooks/useMake";
import StatCard from "../../common/StatCard";

export default function MakeStats() {

    const dashboard = useMake();

    return (

        <div className="make-stats">

            <StatCard
                title="Rutinas Activas"
                value={dashboard.activeRoutines}
                subtitle="Rutinas actualmente en ejecución"
            />

            <StatCard
                title="Órdenes Pendientes"
                value={dashboard.pendingOrders}
                subtitle="Pendientes por ejecutar"
            />

            <StatCard
                title="Órdenes Completadas"
                value={dashboard.completedOrders}
                subtitle="Finalizadas correctamente"
            />

            <StatCard
                title="Total de Rutinas"
                value={dashboard.totalRoutines}
                subtitle="Rutinas registradas"
            />

        </div>

    );

}