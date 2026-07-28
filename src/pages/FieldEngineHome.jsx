import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import FieldEngineHero from "../components/fieldengine/home/FieldEngineHero";
import FieldEngineQuickAccess from "../components/fieldengine/home/FieldEngineQuickAccess";
import FieldEngineConsumerModules from "../components/fieldengine/home/FieldEngineConsumerModules";
import FieldEngineRecentActivity from "../components/fieldengine/home/FieldEngineRecentActivity";
import FieldEngineRecentTemplates from "../components/fieldengine/home/FieldEngineRecentTemplates";
import FieldEngineRecentResponses from "../components/fieldengine/home/FieldEngineRecentResponses";

import "../styles/fieldengine/fieldEngineHome.css";

export default function FieldEngineHome(){

    return(

        <div className="field-engine-shell">

            <Sidebar/>

            <div className="field-engine-main">

                <Navbar/>

                <main className="field-engine-page">

    <FieldEngineHero/>

    <FieldEngineQuickAccess/>

    <FieldEngineConsumerModules/>

    <FieldEngineRecentActivity/>

    <div className="fe-home-bottom-grid">

        <FieldEngineRecentTemplates/>

        <FieldEngineRecentResponses/>

    </div>

</main>

            </div>

        </div>

    );

}