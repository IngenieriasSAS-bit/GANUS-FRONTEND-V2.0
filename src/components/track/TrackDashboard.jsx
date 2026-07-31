import useTrack from "../../hooks/useTrack";

import TrackStats from "./TrackStats";
import TrackOrdersTable from "./TrackOrdersTable";

import { useState } from "react";
import TrackOrderDetail from "./TrackOrderDetail";
export default function TrackDashboard() {

    const {

        stats,

        orders,

    } = useTrack();

    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

    return (

        <>

            <TrackStats

                stats={stats}

            />

            <TrackOrdersTable

    orders={orders}

    onView={setOrdenSeleccionada}

/>

<TrackOrderDetail

    order={ordenSeleccionada}

    onClose={() =>

        setOrdenSeleccionada(null)

    }

/>

        </>

    );

}