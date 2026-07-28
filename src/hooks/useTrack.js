import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {

    getWorkOrders,

} from "../services/makeService";

export default function useTrack() {

    const loadOrders = () => {

        const orders = getWorkOrders();

        return {

            orders,

            stats: {

                total: orders.length,

                pending: orders.filter(

                    order => order.status === "pending"

                ).length,

                inProgress: orders.filter(

                    order => order.status === "in_progress"

                ).length,

                paused: orders.filter(

                    order => order.status === "paused"

                ).length,

                completed: orders.filter(

                    order => order.status === "completed"

                ).length,

            },

        };

    };

    const [data, setData] = useState(loadOrders());

    const refresh = useCallback(() => {

    setData(loadOrders());

}, []);

    useEffect(() => {

    window.addEventListener(
        "make-updated",
        refresh
    );

    return () => {

        window.removeEventListener(
            "make-updated",
            refresh
        );

    };

}, [refresh]);

    return {

        ...data,

        refresh,

    };

}