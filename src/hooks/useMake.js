import {

    useEffect,

    useState,

} from "react";

import {

    getMakeDashboard,

} from "../services/makeService";

export default function useMake() {

    const [

        dashboard,

        setDashboard,

    ] = useState(

        getMakeDashboard()

    );

    useEffect(() => {

        const refresh = () =>

            setDashboard(

                getMakeDashboard()

            );

        window.addEventListener(

            "make-updated",

            refresh

        );

        window.addEventListener(

            "field-engine-updated",

            refresh

        );

        return () => {

            window.removeEventListener(

                "make-updated",

                refresh

            );

            window.removeEventListener(

                "field-engine-updated",

                refresh

            );

        };

    }, []);

    return dashboard;

}