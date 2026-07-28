import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import SaveStatusBadge from "../core/common/SaveStatusBadge";
import RestoreDraftModal from "../core/common/RestoreDraftModal";

export default function AppLayout({ children }) {

    return (

        <>

            <Sidebar />

            <Navbar />

            <SaveStatusBadge />

            <RestoreDraftModal />

            {children}

        </>

    );

}