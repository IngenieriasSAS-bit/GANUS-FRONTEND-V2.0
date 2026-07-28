import { useState } from "react";

import BandejaOrdenes from "./BandejaOrdenes";
import WorkOrderExecution from "../operacion/workorders/WorkOrderExecution";

import { getWorkOrders } from "../../services/makeService";

export default function ExecutionLayout({

    filters,

}) {

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    if (!selectedOrderId) {

        return (

            <BandejaOrdenes

                filters={filters}

                onSelectOrder={(order) =>

                    setSelectedOrderId(order.id)

                }

            />

        );

    }

    const order = getWorkOrders().find(

        item => item.id === selectedOrderId

    );

    if (!order) {

        return (

            <BandejaOrdenes

                filters={filters}

                onSelectOrder={(order) =>

                    setSelectedOrderId(order.id)

                }

            />

        );

    }

    return (

        <WorkOrderExecution

            workOrder={order}

            onBack={() =>

                setSelectedOrderId(null)

            }

        />

    );

}