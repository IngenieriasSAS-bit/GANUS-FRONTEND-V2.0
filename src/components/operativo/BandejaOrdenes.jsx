import { useEffect, useState } from "react";
import OrdenCard from "./OrdenCard";
import { getWorkOrders } from "../../services/makeService";

export default function BandejaOrdenes({

    onSelectOrder,
    filters,

}) {

    const [orders, setOrders] = useState(() => getWorkOrders());

    useEffect(() => {

        const refreshOrders = () => {

            setOrders(getWorkOrders());

        };

        window.addEventListener("make-updated", refreshOrders);

        return () => {

            window.removeEventListener(
                "make-updated",
                refreshOrders
            );

        };

    }, []);

    const search = (filters?.search || "").trim().toLowerCase();

    const status = filters?.status || "";

    const filteredOrders = orders.filter((order) => {

        const searchableText = [

            order.id,
            order.routineName,
            order.templateName,
            order.priority,
            order.plannedDate,

            ...(order.assignedOperators || []).map(
                operator => operator.nombre
            ),

        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch =

            !search ||

            searchableText.includes(search);

        const matchesStatus =

            !status ||

            order.status === status;

        return matchesSearch && matchesStatus;

    });

    if (!filteredOrders.length) {

        return (

            <div className="operativo-empty">

                No se encontraron órdenes con los filtros seleccionados.

            </div>

        );

    }

    return (

        <section className="operativo-orders">

            <div className="operativo-orders-header">

                <h2>

                    Mis Órdenes

                </h2>

                <span>

                    {filteredOrders.length} órdenes

                </span>

            </div>

            <div className="operativo-orders-grid">

                {

                    filteredOrders.map(order => (

                        <OrdenCard

                            key={order.id}

                            order={order}

                            onExecute={onSelectOrder}

                        />

                    ))

                }

            </div>

        </section>

    );

}