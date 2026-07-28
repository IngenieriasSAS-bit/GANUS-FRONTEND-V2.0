import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import WorkOrdersHero from "../components/make/workorders/WorkOrdersHero";
import WorkOrdersStats from "../components/make/workorders/WorkOrdersStats";
import WorkOrdersFilters from "../components/make/workorders/WorkOrdersFilters";
import WorkOrdersTable from "../components/make/workorders/WorkOrdersTable";
import WorkOrderDetails from "../components/make/workorders/WorkOrderDetails";
import NewWorkOrderModal from "../components/make/workorders/NewWorkOrderModal";

import useWorkOrders from "../hooks/useWorkOrders";

import {
    changeWorkOrderStatus,
} from "../services/makeService";

import {
    ORDER_STATUS,
} from "../constants/makeConstants";

export default function WorkOrders() {

    const {

        filters,
        setFilters,

        orders,
        summary,

        refresh,

    } = useWorkOrders();

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [openDetails, setOpenDetails] = useState(false);
    const [openNewOrder, setOpenNewOrder] = useState(false);


    const openOrder = (order) => {

        setSelectedOrder(order);

        setOpenDetails(true);

    };

    const updateStatus = (order, status) => {

        try {

            changeWorkOrderStatus(
                order.id,
                status
            );

            refresh();

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="make">

                <WorkOrdersHero
    totalOrders={summary.total || 0}
    onCreate={() => setOpenNewOrder(true)}
/>

                <WorkOrdersStats
                    summary={summary}
                />

                <WorkOrdersFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={() => setFilters({})}
                />

                <WorkOrdersTable
                    orders={orders}
                    onView={openOrder}
                    onStart={(order) =>
                        updateStatus(
                            order,
                            ORDER_STATUS.IN_PROGRESS
                        )
                    }
                    onPause={(order) =>
                        updateStatus(
                            order,
                            ORDER_STATUS.PAUSED
                        )
                    }
                    onComplete={(order) =>
                        updateStatus(
                            order,
                            ORDER_STATUS.COMPLETED
                        )
                    }
                />

                <WorkOrderDetails
                    open={openDetails}
                    order={selectedOrder}
                    onClose={() => setOpenDetails(false)}
                />

                <NewWorkOrderModal
    isOpen={openNewOrder}
    onClose={() => setOpenNewOrder(false)}
    onCreated={refresh}
/>

            </main>

        </>

    );

}