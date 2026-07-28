import useTrack from "../../hooks/useTrack";

import TrackStats from "./TrackStats";
import TrackOrdersTable from "./TrackOrdersTable";

export default function TrackDashboard() {

    const {

        stats,

        orders,

    } = useTrack();

    return (

        <>

            <TrackStats

                stats={stats}

            />

            <TrackOrdersTable

                orders={orders}

            />

        </>

    );

}